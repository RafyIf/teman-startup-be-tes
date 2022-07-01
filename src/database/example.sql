DROP TABLE IF EXISTS "tb_customers";
DROP SEQUENCE IF EXISTS tb_customers_id_seq;
CREATE SEQUENCE tb_customers_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tb_customers" (
    "id" integer DEFAULT nextval('tb_customers_id_seq') NOT NULL,
    "full_name" character varying NOT NULL,
    "email" character varying NOT NULL,
    "address" text NOT NULL,
    "phone" character varying(15) NOT NULL,
    CONSTRAINT "tb_customers_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "tb_customers" ("id", "full_name", "email", "address", "phone") VALUES
(1,	'Roman',	'roman@mail.com',	'Indonesia, Bogor, Jawa Barat',	'+6281445671890'),
(2,	'Supri',	'supri@mail.com',	'Indonesia, Aceh',	'+6281491171900');

DROP TABLE IF EXISTS "tb_order_items";
DROP SEQUENCE IF EXISTS tb_order_items_id_seq;
CREATE SEQUENCE tb_order_items_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tb_order_items" (
    "id" integer DEFAULT nextval('tb_order_items_id_seq') NOT NULL,
    "order_id" integer NOT NULL,
    "product_id" integer NOT NULL,
    "qty" double precision NOT NULL,
    CONSTRAINT "tb_order_items_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "tb_order_items" ("id", "order_id", "product_id", "qty") VALUES
(1,	1,	1,	3),
(2,	1,	2,	1),
(3,	1,	3,	1),
(4,	1,	4,	10),
(5,	2,	1,	1),
(6,	2,	2,	4);

DROP TABLE IF EXISTS "tb_orders";
DROP SEQUENCE IF EXISTS tb_orders_id_seq;
CREATE SEQUENCE tb_orders_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tb_orders" (
    "id" integer DEFAULT nextval('tb_orders_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "grand_total" double precision NOT NULL,
    "date_created" timestamp NOT NULL,
    "date_modified" timestamp NOT NULL,
    CONSTRAINT "tb_orders_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "tb_orders" ("id", "user_id", "grand_total", "date_created", "date_modified") VALUES
(1,	1,	25765000,	'2022-06-29 10:59:39.113215',	'2022-06-29 10:59:39.113215'),
(2,	2,	2345000,	'2022-06-29 11:00:42.025924',	'2022-06-29 11:00:42.025924');

DROP TABLE IF EXISTS "tb_products";
DROP SEQUENCE IF EXISTS tb_products_id_seq;
CREATE SEQUENCE tb_products_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tb_products" (
    "id" integer DEFAULT nextval('tb_products_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "price" double precision NOT NULL,
    CONSTRAINT "tb_products_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "tb_products" ("id", "name", "price") VALUES
(1,	'Tv',	2300000),
(2,	'Laptop',	19100000),
(3,	'Smartphone',	4320000),
(4,	'Mouse pad',	45000);

ALTER TABLE ONLY "public"."tb_order_items" ADD CONSTRAINT "tb_order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES tb_orders(id) ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."tb_order_items" ADD CONSTRAINT "tb_order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES tb_products(id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."tb_orders" ADD CONSTRAINT "tb_orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES tb_customers(id) ON DELETE CASCADE NOT DEFERRABLE;
