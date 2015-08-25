-- Function: get_type_name(integer, boolean, character varying)

-- DROP FUNCTION get_type_name(integer, boolean, character varying);

CREATE OR REPLACE FUNCTION get_type_name(
    t integer,
    is_kelurahan boolean,
    name character varying)
  RETURNS character varying AS
$BODY$
        BEGIN
		IF(t = 4) THEN
			if (is_kelurahan) THEN
				return 'Kelurahan';
			END IF;			
			RETURN 'Desa';
		END IF;
		IF(t = 3) THEN
			RETURN 'Kecamatan';
		END IF;
		IF(t = 2) THEN
			if (strpos(name, 'Kota ') = 1) THEN
				return 'Kota';
			END IF;			
			RETURN 'Kabupaten';
		END IF;
		IF(t = 1) THEN		
			RETURN 'Propinsi';
		END IF;
		return null;
        END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION get_type_name(integer, boolean, character varying)
  OWNER TO postgres;

  
-- Function: get_name_without_type(integer, boolean, character varying)

-- DROP FUNCTION get_name_without_type(integer, boolean, character varying);

CREATE OR REPLACE FUNCTION get_name_without_type(
    t integer,
    is_kelurahan boolean,
    name character varying)
  RETURNS character varying AS
$BODY$
        BEGIN
		IF(t = 2) THEN
			if (strpos(name, 'Kota ') = 1) THEN
				return substr(name, 6);
			END IF;			
			RETURN name;
		END IF;
		return name;
        END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION get_name_without_type(integer, boolean, character varying)
  OWNER TO postgres;

  
-- Function: get_parent(integer, boolean, character varying, character varying)

-- DROP FUNCTION get_parent(integer, boolean, character varying, character varying);

CREATE OR REPLACE FUNCTION get_parent(
    t integer,
    is_kelurahan boolean,
    parent_name character varying,
    parent_parent_name character varying)
  RETURNS character varying AS
$BODY$
        BEGIN
		IF(t = 4) THEN
			return get_type_name(2, false, parent_parent_name) || ' ' || get_name_without_type(2, false, parent_parent_name); 
		END IF;
		IF(t = 3) THEN
			return get_type_name(2, false, parent_name) || ' ' || get_name_without_type(2, false, parent_name);
		END IF;
		IF(t = 2) THEN
			return get_type_name(1, false, parent_name) || ' ' || get_name_without_type(1, false, parent_name);
		END IF;
		return null;
        END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION get_parent(integer, boolean, character varying, character varying)
  OWNER TO postgres;

  
 -- Materialized View: region_search_results

-- DROP MATERIALIZED VIEW region_search_results;

CREATE MATERIALIZED VIEW region_search_results AS 
 SELECT r.id,
    get_name_without_type(r.type, r.is_kelurahan, r.name::character varying) AS name,
    r.type,
    get_type_name(r.type, r.is_kelurahan, r.name::character varying) AS type_name,
    pr.id AS parent_id,
    get_parent(r.type, r.is_kelurahan, pr.name::character varying, ppr.name::character varying) AS parent
   FROM regions r
     LEFT JOIN regions pr ON r.fk_parent_id::text = pr.id::text
     LEFT JOIN regions ppr ON pr.fk_parent_id::text = ppr.id::text
WITH DATA;

ALTER TABLE region_search_results
  OWNER TO postgres;

  
 