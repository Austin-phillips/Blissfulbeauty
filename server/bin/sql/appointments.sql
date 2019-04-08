CREATE TABLE appointments(
  id      SERIAL PRIMARY KEY,
  date    VARCHAR(50),
  time    VARCHAR(50),
  notes   VARCHAR(100),
  service VARCHAR(50),
  first   VARCHAR(50),
  last    VARCHAR(50),
  email   VARCHAR(50),
  length  INT,
  uid     VARCHAR(100),
  price   INT,
  number  VARCHAR(50)
);

INSERT INTO appointments(date, time, notes, service, first, last, email, length, uid, price, number)
VALUES
('4/15/19', '9:00 AM', 'None', 'haircut', 'Austin', 'Phillips', 'Phillips.austin51@gmail.com', 90, '12993', 7, '8019799538'),
('4/15/19', '9:30 AM', 'None', 'Eyelashes', 'Jaiden', 'Kallas', 'JaidenKallas@gmail.com', 120, '1293263', 10, '8018221399'),
('4/15/19', '11:00 AM', 'None', 'haircut', 'Cameron', 'Forte', 'cameronforte31@gmail.com', 60, '129923113', 50, '8018034545'),
('4/16/19', '9:00 AM', 'None', 'haircut', 'Austin', 'Phillips', 'Phillips.austin51@gmail.com', 90, '12993', 7, '8019799538'),
('4/17/19', '9:30 AM', 'None', 'Eyelashes', 'Jaiden', 'Kallas', 'JaidenKallas@gmail.com', 120, '1293263', 10, '8018221399'),
('4/18/19', '11:00 AM', 'None', 'haircut', 'Cameron', 'Forte', 'cameronforte31@gmail.com', 60, '129923113', 50, '8018034545');