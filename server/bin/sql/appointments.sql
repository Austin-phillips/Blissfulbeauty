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
('04/15/19', '1:00 PM', 'None', 'haircut', 'Austin', 'Phillips', 'Phillips.austin51@gmail.com', 15, '12993', 7, '8019799538'),
('04/16/19', '1:00 PM', 'None', 'Eyelashes', 'Jaiden', 'Kallas', 'JaidenKallas@gmail.com', 30, '1293263', 10, '8019799538'),
('04/17/19', '1:00 PM', 'None', 'haircut', 'Cameron', 'Forte', 'cameronforte31@gmail.com', 60, '129923113', 50, '8019799538'),
('04/18/19', '1:00 PM', 'None', 'haircut', 'Austin', 'Phillips', 'Phillips.austin51@gmail.com', 90, '12993', 7, '8019799538'),
('04/19/19', '1:00 PM', 'None', 'Eyelashes', 'Jaiden', 'Kallas', 'JaidenKallas@gmail.com', 120, '1293263', 10, '8019799538'),
('04/20/19', '4:00 PM', 'None', 'haircut', 'Cameron', 'Forte', 'cameronforte31@gmail.com', 150, '129923113', 50, '8019799538');