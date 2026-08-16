-- Simple insert book procecure
CREATE OR REPLACE PROCEDURE sp_Book_register (
    p_isbn JL_BOOKS.ISBN%TYPE,
    p_title JL_BOOKS.TITLE%TYPE,
    p_pubdate JL_BOOKS.PUBDATE%TYPE,
    p_pubid JL_BOOKS.PUBID%TYPE,
    p_cost JL_BOOKS.COST%TYPE,
    p_retail JL_BOOKS.RETAIL%TYPE,
    p_discount JL_BOOKS.DISCOUNT%TYPE,
    p_category JL_BOOKS.RETAIL%TYPE
)
AS
BEGIN
    INSERT INTO JL_BOOKS (ISBN, TITLE, PUBDATE, PUBID, COST, RETAIL, DISCOUNT, CATEGORY)
    VALUES (p_isbn, p_title, p_pubid, p_pubdate, p_cost, p_retail, p_discount, p_category);
END;
/

--Testing our insert procedure
BEGIN
    sp_Book_register(6969696969, 'UFOS and Nukes', '18-JAN-01', 1, 12.99, 8.99, 0, 'PARANORMAL');
END;
/

SELECT * FROM JL_BOOKS WHERE ISBN = 6969696969;


--GETTING ALL DISTINCT PUBLISHER IDS

SELECT DISTINCT PUBID FROM JL_BOOKS;

-- ============================================
-- JL BOOK SALES APPLICATION
-- TASK 2 - AUTHOR RELATED ACTIVITIES
-- ============================================

-- Task 2-1: Check JL_AUTHOR table
DESC JL_AUTHOR;


-- Task 2-1: Register Author Procedure
CREATE OR REPLACE PROCEDURE sp_register_author
(
    p_authorid IN JL_AUTHOR.AUTHORID%TYPE,
    p_lname    IN JL_AUTHOR.LNAME%TYPE,
    p_fname    IN JL_AUTHOR.FNAME%TYPE
)
AS
BEGIN
    INSERT INTO JL_AUTHOR (AUTHORID, LNAME, FNAME)
    VALUES (p_authorid, p_lname, p_fname);

    COMMIT;
END;
/


-- Task 2-2: Check JL_BOOKAUTHOR table
DESC JL_BOOKAUTHOR;


-- Task 2-2: Assign Author Procedure
CREATE OR REPLACE PROCEDURE sp_assign_author
(
    p_isbn     IN JL_BOOKAUTHOR.ISBN%TYPE,
    p_authorid IN JL_BOOKAUTHOR.AUTHORID%TYPE
)
AS
BEGIN
    INSERT INTO JL_BOOKAUTHOR (ISBN, AUTHORID)
    VALUES (p_isbn, p_authorid);

    COMMIT;
END;
/


-- Final verification
SELECT ISBN, AUTHORID
FROM JL_BOOKAUTHOR
WHERE ISBN = '0401140733'
AND AUTHORID = 'F310';

-- task 3: register customer 
CREATE OR REPLACE PROCEDURE SP_REGISTER_CUSTOMER (
    p_customer_id  IN NUMBER,
    p_lastname     IN VARCHAR2,
    p_firstname    IN VARCHAR2,
    p_address      IN VARCHAR2,
    p_city         IN VARCHAR2,
    p_state        IN VARCHAR2,
    p_zip          IN VARCHAR2,
    p_referred     IN NUMBER,
    p_region       IN VARCHAR2,
    p_email        IN VARCHAR2,
    p_credit_limit IN NUMBER
)
AS
BEGIN
    INSERT INTO JL_CUSTOMERS (customer#, lastname,firstname,address,city,state,zip, referred, region, email, credit_limit)
    VALUES ( p_customer_id, p_lastname, p_firstname, p_address, p_city, p_state, p_zip, p_referred, p_region,p_email, p_credit_limit);
    COMMIT;
END;