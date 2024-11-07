CREATE TABLE IF NOT EXISTS College
(
    ID   VARCHAR(10) PRIMARY KEY,
    Name TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS CollegeAdmins
(
    ClgID          VARCHAR(10)  NOT NULL,
    userName       VARCHAR(100) NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ClgID, userName),
    FOREIGN KEY (ClgID) REFERENCES College (ID) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Faculty
(
    F_ID            VARCHAR(10),
    ClgID           VARCHAR(10),
    Name            VARCHAR(100) NOT NULL,
    Email           VARCHAR(100) NOT NULL,
    Phone           VARCHAR(10)  NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,

    PRIMARY KEY (F_ID, ClgID),
    FOREIGN KEY (ClgID) REFERENCES College (ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Files
(
    file_id    SERIAL PRIMARY KEY,
    file_data  BYTEA,
    file_name  TEXT,
    created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS Exam
(
    E_ID                SERIAL,
    ClgID               VARCHAR(10),
    title               VARCHAR(100) NOT NULL,

    start_date          DATE         NOT NULL,
    end_date            DATE         NOT NULL,

    seating_arrangement INT,
    time_table          INT,

    created_time        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (E_ID, ClgID),

    FOREIGN KEY (ClgID) REFERENCES College (ID) ON UPDATE CASCADE,
    FOREIGN KEY (seating_arrangement) REFERENCES Files (file_id) ON UPDATE CASCADE,
    FOREIGN KEY (time_table) REFERENCES Files (file_id) ON UPDATE CASCADE
);

/**
  The table for which semesters the exam is conducting for
 */
CREATE TABLE ExamFor
(
    ClgID    VARCHAR(10) NOT NULL,
    E_ID     INT         NOT NULL,
    scheme   INT         NOT NULL,
    semester INT         NOT NULL,

    PRIMARY KEY (ClgID, E_ID, scheme, semester),

    FOREIGN KEY (E_ID, ClgID) REFERENCES Exam (E_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Course
(
    semester   INT,
    scheme     INT,
    name       VARCHAR(100) NOT NULL,
    course_id  varchar(10),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (scheme, course_id)
);

CREATE TYPE StatusTypes AS ENUM ('pending', 'success', 'under scrutiny', 'scrutinized', 'submitted');

CREATE TABLE IF NOT EXISTS QuestionPaper
(
    f_id           VARCHAR(10),
    e_id           INT                           NOT NULL,
    clgID          varchar(10)                   NOT NULL,
    course_id      varchar(10)                   NOT NULL,
    scheme         INT                           NOT NULL,

    status         StatusTypes DEFAULT 'pending' NOT NULL,
    due_date       DATE                          NOT NULL,
    submitted_date DATE,

    file_id        INT,
    created_date   timestamp   DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (scheme, course_id, e_id, clgID),

    FOREIGN KEY (f_id, clgID) REFERENCES Faculty (F_ID, ClgID) ON UPDATE CASCADE,
    FOREIGN KEY (file_id) REFERENCES Files (file_id) ON UPDATE CASCADE,
    FOREIGN KEY (e_id, clgID) REFERENCES Exam (E_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id, scheme) REFERENCES Course (course_id, scheme) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Teaches
(
    f_ID      VARCHAR(10),
    clg_ID    VARCHAR(10),
    course_ID VARCHAR(10),
    scheme    INT,

    FOREIGN KEY (f_ID, clg_ID) REFERENCES Faculty (F_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_ID, scheme) REFERENCES Course (course_id, scheme) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Coordinators
(
    f_ID    VARCHAR(10),
    clg_ID  VARCHAR(10),
    exam_ID INT,

    FOREIGN KEY (f_ID, clg_ID) REFERENCES Faculty (F_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (exam_ID, clg_ID) REFERENCES Exam (E_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Scrutinizes
(
    f_ID           VARCHAR(10),
    clg_ID         VARCHAR(10),
    course_ID      VARCHAR(10),
    scheme         INT,
    exam_ID        INT,

    status         StatusTypes DEFAULT 'pending' NOT NULL,
    created_date   DATE        DEFAULT CURRENT_DATE,
    due_date       DATE                          NOT NULL,
    submitted_date DATE,

    FOREIGN KEY (f_ID, clg_ID) REFERENCES Faculty (F_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_ID, scheme) REFERENCES Course (course_id, scheme) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (exam_ID, clg_ID) REFERENCES Exam (E_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE
)