Begin;

TRUNCATE
    holistic_users
    RESTART IDENTITY CASCADE;

INSERT INTO holistic_users (full_name, email, user_name, password)
VALUES
('Kuntcheramen Khafra', 'kckhafra@hotmail.com', 'kckhafra', '$2a$12$STAgfpqzWHKe4npTXyvnceCmbuL6WOq0TR4RENC.icDIep4hWvAYm'),
('LaDonia Wicks', 'Lawicks@gmail.com', 'lawicks', '$2a$12$ktin3uHcYudgXywDR6PV6uweF5ijo7CuQPln8EdD2lY9XlBQ4xrXa' );

INSERT INTO holistic_users_inventory (user_id,service_name, price, remaining_inventory,description, product_category)
VALUES
('1', 'sea moss', 20, 5, 'helps with strength and bones', 'Plant-based' ),
('1', 'tea', 5, 10, 'herbal tea that helps with coughs and liver', 'Tea'),
('2', 'counseling', 120, 5, 'help to correct inner self', 'Counseling');

COMMIT;