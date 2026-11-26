import os
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.engine import URL

# Load environment variables (from backend/.env locally or platform env vars in cloud)
load_dotenv()


def _normalize_postgres_url(raw_url: str) -> str:
    """Normalize Neon / cloud PostgreSQL URLs for SQLAlchemy + psycopg v3."""
    url = raw_url.strip()
    if url.startswith("postgres://"):
        url = "postgresql+psycopg://" + url[len("postgres://"):]
    elif url.startswith("postgresql://") and "+psycopg" not in url.split("://", 1)[0]:
        url = "postgresql+psycopg://" + url[len("postgresql://"):]

    parsed = urlparse(url)
    # Strip query parameters unsupported by psycopg libpq (e.g., Prisma/pgbouncer flags)
    query_params = [
        (k, v)
        for k, v in parse_qsl(parsed.query, keep_blank_values=True)
        if k.lower() not in ("pgbouncer", "connection_limit", "pool_timeout", "channel_binding")
    ]
    return urlunparse(parsed._replace(query=urlencode(query_params)))


CLOUD_DB_URL = (
    os.getenv("POSTGRES_URL")
    or os.getenv("DATABASE_URL_POOLED")
    or os.getenv("DATABASE_URL")
)

if CLOUD_DB_URL:
    DATABASE_URL = _normalize_postgres_url(CLOUD_DB_URL)
else:
    # Read MySQL settings for local/MySQL deployments
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = int(os.getenv("DB_PORT", 3306))
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    if not all([DB_HOST, DB_NAME, DB_USER, DB_PASSWORD]):
        raise ValueError(
            "Database configuration missing: set POSTGRES_URL/DATABASE_URL or DB_HOST, DB_NAME, DB_USER, DB_PASSWORD"
        )

    DATABASE_URL = URL.create(
        drivername="mysql+pymysql",
        username=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
    )

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

# Create database sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base class for database models
Base = declarative_base()


# Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
