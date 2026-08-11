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
