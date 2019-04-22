CREATE TABLE services(
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(50),
  price       FLOAT,
  description VARCHAR(150),
  length      INT
);

INSERT INTO services(name, price, description, length)
VALUES
('Classic Full Set', 75, '', 90),
('Classic Fill', 35, '', 60),
('Hybrid Full Set', 85, '', 120),
('Hybrid Fill', 40, '', 90),
('Volume Full Set', 95, '', 150),
('Volume Fill', 45, '', 120),
('Lash Removal', 15, '', 30),
('Microblading', 250, '', 120),
('Microblading 6 Week Touch Up', 75, '', 60),
('Eyebrow Wax', 10, '', 15),
('Upper Lip Wax', 5, '', 15),
('Nose Wax', 10, '', 15),
('Cheek Wax', 12, '', 15),
('Full Face Wax', 30, '', 30),
('Eyebrow Tinting', 15, '', 30),
('Eyelash Tinting', 15, '', 30);
