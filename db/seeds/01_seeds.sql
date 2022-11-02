INSERT INTO users (name, email, password, avatar_url) VALUES
  ('Caitlin Croteau', 'caitlin-croteau@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', null),
  ('Sarah Moss', 'sarah.moss@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', null),
  ('Billy Wong', 'billywong@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', null);

INSERT INTO categories (name) VALUES
  ('Film / Series'),
  ('Restaurants / Cafes / etc.'),
  ('Books'),
  ('Products');

INSERT INTO lists (user_id, name, icon_url) VALUES
  (3, 'Plan trip to Canada', null),
  (3, 'Groceries', null),
  (3, 'Books to read', null),
  (1, 'Summer Plan', null),
  (2, 'My Todos List', null);

INSERT INTO tasks (list_id, category_id, name, create_at, priority) VALUES
  (1, 1, 'Friends', '2022-05-19', FALSE),
  (3, 2, 'Alloy', '2022-05-02', TRUE),
  (2, 4, 'iphone 13', '2021-12-31', TRUE),
  (1, 3, 'Atomic Habits', '2022-03-25', TRUE),
  (1, 2, 'Lulu Bar', '2022-01-18', FALSE),
  (2, 2, 'Alumni Sandwiches', '2022-06-22', TRUE),
  (3, 1, 'Doctor Strange', '2022-02-14', FALSE),
  (2, 2, 'Namo Cafe', '2022-05-19', TRUE),
  (3, 3, 'Sherlock Holmes', '2020-10-21', FALSE),
  (1, 4, 'galaxy watch 4', '2022-07-01', TRUE);
