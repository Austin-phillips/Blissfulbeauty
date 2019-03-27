CREATE TABLE services(
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(50),
  price       FLOAT,
  description VARCHAR(150),
  length      INT
);

INSERT INTO services(name, price, description, length)
VALUES
('Haircut', 7.00, 'best haircut', 90),
('Lazer hair removal', 10.00, 'get rid of that hair', 60),
('Eyelashes', 15.00, 'lets get you looking pretty', 30 );