CREATE OR REPLACE FUNCTION public.roomiegetchatsanduserdetails(
	id uuid)
    RETURNS TABLE(chatrecordid integer, chatid uuid, user1 uuid, user2 uuid, userprofileimage text, username text, createddate date) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY 
    SELECT 
		cr."ChatRecordID",
		cr."ChatID",
		cr."User1ID",
		cr."User2ID",
		CASE 
			WHEN 
				cr."User1ID" = id THEN CAST(PI2."ImageUrl" AS TEXT)
			ELSE 
				CAST(PI1."ImageUrl" AS TEXT)
		END AS 
			   "UserProfileImage",
	    CASE 
			WHEN 
				cr."User1ID" = id THEN CONCAT(u2."FirstName", ' ', u2."SecondName")
			ELSE 
				CONCAT(u1."FirstName", ' ', u1."SecondName")
		END AS 
			   "UserName",
			
		cr."CreatedDate"
    FROM 
		public."ChatRecordTBL" cr
	INNER JOIN
		public."UserTBL" u1 ON (cr."User1ID" = u1."UserIdentifier")
	
	INNER JOIN
		public."UserTBL" u2 ON (cr."User2ID" = u2."UserIdentifier")

	LEFT JOIN
		public."ProfileImageTBL" PI1 ON (u1."UserID" = PI1."UserID" AND PI1."ImageType" = 1 AND PI1."CurrentSelected" = 1)
	LEFT JOIN
		public."ProfileImageTBL" PI2 ON (u2."UserID" = PI2."UserID" AND PI2."ImageType" = 1 AND PI2."CurrentSelected" = 1)
		
    WHERE 
		(cr."User1ID" = id AND cr."User2ID" <> id)
		OR
		(cr."User2ID" = id AND cr."User1ID" <> id);
END;
$BODY$;

ALTER FUNCTION public.roomiegetchatsanduserdetails(uuid)
    OWNER TO postgres;
