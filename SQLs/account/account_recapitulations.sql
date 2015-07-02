CREATE OR REPLACE VIEW account_recapitulations AS

        SELECT
	apbn.key ||'-'|| r.id as id,
	r.id as region_id, 
	apbn.id as apbn_id,
	apbn.key as apbn_key,
	r.fk_parent_id as parent_region_id,
    r.name as region_name,
    0 as budgeted_income,
    0 as realized_income,
    0 as budgeted_expense,
    0 as realized_expense,
    0 as recap1_expense,
    0 as recap2_expense,
    0 as recap3_expense,
    0 as recap4_expense,
    0 as total_desa,
    0 as completed_desa
    FROM regions r
    cross join apbns apbn
    ;
