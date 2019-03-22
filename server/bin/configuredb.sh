#!/bin/bash

database="blissfulbeautydb"

echo "Configuring database: $database"

dropdb -U node_user blissfulbeautydb
createdb -U node_user blissfulbeautydb

psql -U node_user blissfulbeautydb < ./bin/sql/services.sql
psql -U node_user blissfulbeautydb < ./bin/sql/appointments.sql
psql -U node_user blissfulbeautydb < ./bin/sql/images.sql

echo "$database configured"