-- ===================================================================
-- Script Name : AlkeWallet.sql
-- Service     : Alke Wallet
-- Environment : Development
-- Database    : MySQL 8
-- Author      : Alejandro Saa
-- Created On  : [yyyy-mm-dd]
-- Last Update : [yyyy-mm-dd]
-- Description :
--   Script para la base de datos del sistema AlkeWallet.
--
--   Este script incluye:
--     1. Creación de la base de datos.
--     2. Definición de tablas.
--     3. Creación de índices.
--     4. Definición de vistas.
--     5. Funciones almacenadas y triggers.
--     6. Inserción de datos iniciales.
-- ===================================================================

CREATE DATABASE IF NOT EXISTS AlkeWallet
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE AlkeWallet;

-- ===================================================================
-- CREATE TABLES
-- ===================================================================

-- role
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    campo_eliminar INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- user
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- user_credentials
CREATE TABLE user_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- BCrypt
    last_login TIMESTAMP NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}$'),
    CONSTRAINT fk_user_credentials_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- wallet
CREATE TABLE wallet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_wallet_user UNIQUE (user_id),
    CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- currency
CREATE TABLE currency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- wallet_currency
CREATE TABLE wallet_currency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_id INT NOT NULL,
    currency_id INT NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_wallet_currency_balance CHECK (balance >= 0),
    CONSTRAINT uq_wallet_currency UNIQUE (wallet_id, currency_id),
    CONSTRAINT fk_wallet_currency_wallet FOREIGN KEY (wallet_id) REFERENCES wallet(id) ON DELETE CASCADE,
    CONSTRAINT fk_wallet_currency_currency FOREIGN KEY (currency_id) REFERENCES currency(id) ON DELETE RESTRICT
);

-- transaction_type
CREATE TABLE transaction_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- wallet_transaction
CREATE TABLE wallet_transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    sender_wallet_id INT NULL, -- user sender money
    receiver_wallet_id INT NOT NULL, -- user receiver money
    currency_id INT NOT NULL,
    amount INT NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_transaction_amount CHECK (amount > 0),
    CONSTRAINT chk_transaction_wallet CHECK (sender_wallet_id IS NULL OR sender_wallet_id <> receiver_wallet_id),
    CONSTRAINT fk_transaction_type FOREIGN KEY (type_id) REFERENCES transaction_type(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_transaction_sender_wallet FOREIGN KEY (sender_wallet_id) REFERENCES wallet(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_transaction_receiver_wallet FOREIGN KEY (receiver_wallet_id) REFERENCES wallet(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_transaction_currency FOREIGN KEY (currency_id) REFERENCES currency(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- access_tokens
CREATE TABLE access_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_access_token_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- refresh_tokens
CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_token_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- ===================================================================
-- CREATE ALTER
-- ===================================================================

-- Eliminar el campo 'campo_eliminar' de la tabla role
ALTER TABLE role 
DROP COLUMN campo_eliminar;

-- ===================================================================
-- INDEXES
-- ===================================================================

-- role
CREATE INDEX idx_role_is_active ON role (is_active);

-- user
CREATE INDEX idx_user_role_active ON user (role_id, is_active);
CREATE INDEX idx_user_last_name ON user (last_name);
CREATE INDEX idx_user_first_name ON user (first_name);

-- user_credentials
CREATE INDEX idx_user_credentials_is_active ON user_credentials (is_active);
CREATE INDEX idx_user_credentials_user_active ON user_credentials (user_id, is_active);
CREATE INDEX idx_user_credentials_last_login ON user_credentials (last_login);

-- currency
CREATE INDEX idx_currency_name ON currency (name);

-- wallet_currency
CREATE INDEX idx_wallet_currency_currency_id ON wallet_currency (currency_id);

-- wallet_transaction
CREATE INDEX idx_wallet_transaction_receiver_created ON wallet_transaction (receiver_wallet_id, created_at);
CREATE INDEX idx_wallet_transaction_sender_created ON wallet_transaction (sender_wallet_id, created_at);
CREATE INDEX idx_wallet_transaction_created_at ON wallet_transaction (created_at);

-- access_tokens
CREATE INDEX idx_access_tokens_expires_at ON access_tokens (expires_at);
CREATE INDEX idx_access_tokens_user_revoked ON access_tokens (user_id, revoked_at);

-- refresh_tokens
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens (expires_at);
CREATE INDEX idx_refresh_tokens_user_revoked ON refresh_tokens (user_id, revoked_at);

-- ===================================================================
-- VIEWS
-- ===================================================================

-- muestra el top‑5 de usuarios con mayor saldo
CREATE OR REPLACE VIEW view_top_5_richest_users AS
SELECT 
    u.id,
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    c.code AS currency_code,
    wc.balance AS current_balance
FROM user u
INNER JOIN wallet w ON u.id = w.user_id
INNER JOIN wallet_currency wc ON w.id = wc.wallet_id
INNER JOIN currency c ON wc.currency_id = c.id
ORDER BY wc.balance DESC
LIMIT 5;

-- ===================================================================
-- INSERTS
-- ===================================================================

START TRANSACTION;

-- role
INSERT INTO role (code, name, description)
VALUES ('USER', 'user', 'standard system user');
SET @role_id = LAST_INSERT_ID();

-- userA
INSERT INTO user (role_id, first_name, last_name)
VALUES (@role_id, 'userA', 'userA');
SET @user_A_id = LAST_INSERT_ID();

INSERT INTO user_credentials (user_id, email, password)
VALUES (@user_A_id, 'userA@mail.com', '1234');

INSERT INTO wallet (user_id)
VALUES (@user_A_id);
SET @wallet_A_id = LAST_INSERT_ID();

-- userB
INSERT INTO user (role_id, first_name, last_name)
VALUES (@role_id, 'userB', 'userB');
SET @user_B_id = LAST_INSERT_ID();

INSERT INTO user_credentials (user_id, email, password)
VALUES (@user_B_id, 'userB@mail.com', '1234');

INSERT INTO wallet (user_id)
VALUES (@user_B_id);
SET @wallet_B_id = LAST_INSERT_ID();

-- currency CLP
INSERT INTO currency (code, name, symbol)
VALUES ('CLP', 'Peso Chileno', 'CLP$');
SET @currency_clp_id = LAST_INSERT_ID();

-- currency USD
INSERT INTO currency (code, name, symbol)
VALUES ('USD', 'US Dollar', 'US$');
SET @currency_usd_id = LAST_INSERT_ID();

-- wallet_currency
INSERT INTO wallet_currency (wallet_id, currency_id, balance)
VALUES
(@wallet_A_id, @currency_clp_id, 150000),  -- userA CLP
(@wallet_A_id, @currency_usd_id, 150000),  -- userA USD
(@wallet_B_id, @currency_clp_id, 150000),  -- userB CLP
(@wallet_B_id, @currency_usd_id, 150000);  -- userB USD

-- transaction_type
INSERT INTO transaction_type (code, name, description)
VALUES ('DEPOSIT', 'Deposit', 'Money deposit into wallet');
SET @type_deposit_id = LAST_INSERT_ID();

INSERT INTO transaction_type (code, name, description)
VALUES ('TRANSFER', 'Transfer', 'Transfer between wallets');
SET @type_transfer_id = LAST_INSERT_ID();

INSERT INTO wallet_transaction (
    type_id, 
    sender_wallet_id, 
    receiver_wallet_id, 
    currency_id, 
    amount, 
    description
)
WITH RECURSIVE rows_generator AS (
    -- Ancla: Empezamos en 1
    SELECT 1 AS n
    UNION ALL
    -- Bucle: Sumamos 1 hasta llegar a 50
    SELECT n + 1 FROM rows_generator WHERE n < 50
)
SELECT 
    -- 1. DETERMINAR EL TIPO (Alterna entre Depósito y Transferencia)
    IF(n % 2 = 1, @type_deposit_id, @type_transfer_id) AS type_id,
    
    -- 2. DETERMINAR EL EMISOR (sender_wallet_id)
    CASE 
        -- Si es depósito, el emisor siempre es NULL
        WHEN n % 2 = 1 THEN NULL 
        -- Del 1 al 25: Transferencias donde userA (wallet_A) le envía a userB
        WHEN n <= 25 THEN @wallet_A_id 
        -- Del 26 al 50: Transferencias donde userB (wallet_B) le envía a userA
        ELSE @wallet_B_id 
    END AS sender_wallet_id,
    
    -- 3. DETERMINAR EL RECEPTOR (receiver_wallet_id)
    CASE 
        -- Impares del 1 al 25: Depósitos directos a la wallet de userA
        WHEN n <= 25 AND n % 2 = 1 THEN @wallet_A_id
        -- Pares del 1 al 25: Transferencias que recibe userB
        WHEN n <= 25 AND n % 2 = 0 THEN @wallet_B_id
        -- Impares del 26 al 50: Depósitos directos a la wallet de userB
        WHEN n > 25 AND n % 2 = 1 THEN @wallet_B_id
        -- Pares del 26 al 50: Transferencias que recibe userA
        ELSE @wallet_A_id
    END AS receiver_wallet_id,
    
    -- 4. MONEDA (Alterna CLP para números impares, USD para pares)
    IF(n % 2 = 1, @currency_clp_id, @currency_usd_id) AS currency_id,
    
    -- 5. MONTO ALEATORIO (Entre 5.000 y 30.000)
    FLOOR(5000 + (RAND() * 25000)) AS amount,
    
    -- 6. DESCRIPCIÓN DINÁMICA
    CASE 
        WHEN n <= 25 AND n % 2 = 1 THEN CONCAT('Depósito inicial en cuenta de userA - Simulación #', n)
        WHEN n <= 25 AND n % 2 = 0 THEN CONCAT('userA envía dinero a userB - Simulación #', n)
        WHEN n > 25 AND n % 2 = 1 THEN CONCAT('Depósito inicial en cuenta de userB - Simulación #', n)
        ELSE CONCAT('userB devuelve dinero a userA - Simulación #', n)
    END AS description
FROM rows_generator;

COMMIT;

-- ===================================================================
-- ACTUALIZACIÓN DE SALDOS POR HISTORIAL INDIVIDUAL (userA y userB)
-- ===================================================================
START TRANSACTION;

-- -------------------------------------------------------------------
-- 1. ACTUALIZAR SALDOS DE userA (@wallet_A_id)
-- -------------------------------------------------------------------

-- Sumar al balance de userA todos los ingresos (Depósitos y Transferencias Recibidas)
UPDATE wallet_currency wc
SET wc.balance = wc.balance + IFNULL((
    SELECT SUM(amount) 
    FROM wallet_transaction 
    WHERE receiver_wallet_id = @wallet_A_id AND currency_id = wc.currency_id
), 0)
WHERE wc.wallet_id = @wallet_A_id;

-- Restar al balance de userA todos los egresos (Transferencias Enviadas)
UPDATE wallet_currency wc
SET wc.balance = wc.balance - IFNULL((
    SELECT SUM(amount) 
    FROM wallet_transaction 
    WHERE sender_wallet_id = @wallet_A_id AND currency_id = wc.currency_id
), 0)
WHERE wc.wallet_id = @wallet_A_id;


-- -------------------------------------------------------------------
-- 2. ACTUALIZAR SALDOS DE userB (@wallet_B_id)
-- -------------------------------------------------------------------

-- Sumar al balance de userB todos los ingresos (Depósitos y Transferencias Recibidas)
UPDATE wallet_currency wc
SET wc.balance = wc.balance + IFNULL((
    SELECT SUM(amount) 
    FROM wallet_transaction 
    WHERE receiver_wallet_id = @wallet_B_id AND currency_id = wc.currency_id
), 0)
WHERE wc.wallet_id = @wallet_B_id;

-- Restar al balance de userB todos los egresos (Transferencias Enviadas)
UPDATE wallet_currency wc
SET wc.balance = wc.balance - IFNULL((
    SELECT SUM(amount) 
    FROM wallet_transaction 
    WHERE sender_wallet_id = @wallet_B_id AND currency_id = wc.currency_id
), 0)
WHERE wc.wallet_id = @wallet_B_id;

COMMIT;

-- ===================================================================
-- CREATE QUERYS
-- ===================================================================

-- [Consulta 1]: Obtener el nombre de la moneda elegida por un usuario específico (Ejemplo: user_id = 1)
-- Esta consulta conecta al usuario con su billetera y sus monedas configuradas.
SELECT DISTINCT c.name 
FROM currency c
INNER JOIN wallet_currency wc ON c.id = wc.currency_id
INNER JOIN wallet w ON wc.wallet_id = w.id
WHERE w.user_id = 1;


-- [Consulta 2]: Obtener todas las transacciones registradas en el sistema
-- Devuelve el historial completo de movimientos financieros de la Wallet.
SELECT * FROM wallet_transaction;


-- [Consulta 3]: Obtener todas las transacciones realizadas (enviadas) por un usuario específico (Ejemplo: user_id = 1)
-- Filtra el historial para mostrar solo los movimientos donde el usuario fue el emisor.
SELECT * FROM wallet_transaction 
WHERE sender_wallet_id = 1;


-- [Consulta 4 - DML]: Modificar el campo correo electrónico de un usuario específico (Ejemplo: user_id = 1)
-- Modifica de forma segura el email en la tabla de credenciales normalizada.
UPDATE user_credentials 
SET email = 'nuevo.email@mail.com' 
WHERE user_id = 1;


-- [Consulta 5 - DML]: Eliminar los datos de una transacción (borrado de fila completo) (Ejemplo: transaction_id = 1)
-- Elimina físicamente el registro seleccionado de la base de datos.
DELETE FROM wallet_transaction 
WHERE id = 1;

-- ===================================================================
-- ROLLBACK
-- ===================================================================

START TRANSACTION;

-- insertar una transacción financiera usando un ID de billetera emisora que NO existe (ID: 999)
INSERT INTO wallet_transaction (
    type_id, 
    sender_wallet_id,
    receiver_wallet_id,
    currency_id, 
    amount, 
    description
)
VALUES (
    @type_deposit_id,     
    999,   -- ERROR: La wallet 999 no existe en la tabla 'wallet'
    @wallet_A_id,     
    @currency_clp_id,     
    5000,  
    'Esta transacción debe fallar y ser revertida'
);

ROLLBACK;