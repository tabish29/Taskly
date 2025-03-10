CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS attivita (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    dueDate TIMESTAMP,
    CONSTRAINT chk_title_not_empty
        CHECK (title != '')
);

-- Table for the association between tasks and categories
CREATE TABLE IF NOT EXISTS attivita_categoria (
    attivita_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    PRIMARY KEY (attivita_id, categoria_id),
    FOREIGN KEY (attivita_id) REFERENCES attivita(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE CASCADE
);
