CREATE OR REPLACE FUNCTION public.roomieinsertreview(
	in_review_date date,
	in_author_uid uuid,
	in_subject_uid uuid,
	in_review_title character varying,
	in_review_text character varying,
	in_review_status integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    ReviewID INTEGER;
    UserID INTEGER;
BEGIN
  		SELECT 
			"UserID" 
		INTO 
			UserID 
		FROM 
			public."UserTBL" 
		WHERE 
			"UserIdentifier" = in_subject_uid;
			
		SELECT 
			"ReviewID" 
		INTO 
			ReviewID 
		FROM 
			public."ReviewTBL" 
		WHERE 
			"UserID" = UserID;

	
    INSERT INTO 
		public."ReviewDetailTBL" ("ReviewID", "ReviewDate","AuthorIdentifier","SubjectIdentifier", "ReviewTitle", "ReviewText", "ReviewStatus" )
    VALUES 
		(ReviewID,in_review_date,in_author_uid,in_subject_uid,in_review_title,in_review_text, in_review_status);
		
	 IF in_review_status = 0 THEN
        UPDATE 
            public."ReviewTBL" 
        SET 
            "NegativeReviews" = "NegativeReviews" + 1 
        WHERE 
            "UserID" = UserID;
    ELSE
        UPDATE 
            public."ReviewTBL" 
        SET 
            "PositiveReviews" = "PositiveReviews" + 1 
        WHERE 
            "UserID" = UserID;
    END IF;
	
	   UPDATE 
            public."ReviewTBL" 
        SET 
            "NumReviews" = "NumReviews" + 1 
        WHERE 
            "UserID" = UserID;
END;
$BODY$;

ALTER FUNCTION public.roomieinsertreview(date, uuid, uuid, character varying, character varying, integer)
    OWNER TO postgres;
