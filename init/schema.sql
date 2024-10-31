CREATE TABLE IF NOT EXISTS College
(
    ID   VARCHAR(10) PRIMARY KEY,
    Name TEXT NOT NULL
);

INSERT INTO College VALUES ('KTE', 'Rajiv Gandhi Institute of Technology');

CREATE TABLE IF NOT EXISTS Admins
(
    ID    VARCHAR(10) PRIMARY KEY,
    ClgID VARCHAR(10),
    Name  VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(10)  NOT NULL,
    FOREIGN KEY (ClgID) REFERENCES College (ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Faculty
(
    F_ID  VARCHAR(10),
    ClgID VARCHAR(10),
    Name  VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(10)  NOT NULL,

    PRIMARY KEY (F_ID, ClgID),
    FOREIGN KEY (ClgID) REFERENCES College (ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Files
(
    file_id   SERIAL PRIMARY KEY,
    file_data BYTEA,
    file_name TEXT,
    file_date DATE DEFAULT CURRENT_DATE
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


    PRIMARY KEY (E_ID, ClgID),
    FOREIGN KEY (ClgID) REFERENCES College (ID),

    FOREIGN KEY (seating_arrangement) REFERENCES Files (file_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (time_table) REFERENCES Files (file_id) ON DELETE CASCADE ON UPDATE CASCADE
);

/**
  The table for which semesters the exam is conducting for
 */
CREATE TABLE ExamFor
(
    ClgID    VARCHAR(10) NOT NULL,
    E_ID     INT NOT NULL,
    scheme   INT NOT NULL,
    semester INT NOT NULL,

    PRIMARY KEY (ClgID, E_ID, scheme, semester),

    FOREIGN KEY (E_ID, ClgID) REFERENCES Exam(E_ID, ClgID)
);


CREATE TABLE IF NOT EXISTS Course
(
    semester  INT,
    scheme    INT,
    course_id varchar(10),
    course    VARCHAR(100) NOT NULL,
    PRIMARY KEY (scheme, course_id)
);

CREATE TYPE StatusTypes AS ENUM ('pending', 'success', 'scrutiny');

CREATE TABLE IF NOT EXISTS QuestionPaper
(

    status         StatusTypes DEFAULT 'pending' NOT NULL,
    created_date   DATE        DEFAULT CURRENT_DATE,
    due_date       DATE                          NOT NULL,
    submitted_date DATE,

    scheme         INT                           NOT NULL,
    course_id      varchar(10)                   NOT NULL,
    examID         INT                           NOT NULL,
    clgID          varchar(10)                   NOT NULL,

    file_id        INT,

    PRIMARY KEY (scheme, course_id, examID, clgID),
    FOREIGN KEY (file_id) REFERENCES Files (file_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (examID, clgID) REFERENCES Exam (E_ID, ClgID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id, scheme) REFERENCES Course (course_id, scheme) ON DELETE CASCADE ON UPDATE CASCADE
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