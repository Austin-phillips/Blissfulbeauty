CREATE TABLE services(
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(50),
  price       FLOAT,
  description VARCHAR(150),
  time        VARCHAR(50)
);

INSERT INTO services(name, price, description, time)
VALUES
('Haircut', 7.00, 'best haircut', '7:00 AM'),
('Lazer hair removal', 10.00, 'get rid of that hair', '8:00 AM'),
('Eyelashes', 15.00, 'lets get you looking pretty', '9:00 AM');