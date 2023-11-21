\echo 'Delete and recreate sweaterweather db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sweaterweather;
CREATE DATABASE sweaterweather;
\connect sweaterweather

\i sweaterweather-schema.sql
\i sweaterweather-seed.sql

\echo 'Delete and recreate sweaterweather_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sweaterweater_test;
CREATE DATABASE sweaterweater_test;
\connect sweaterweater_test

\i sweaterweather-schema.sql
