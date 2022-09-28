-- CreateTable
CREATE TABLE "categories" (
    "category_id" SMALLINT NOT NULL,
    "category_name" VARCHAR(15) NOT NULL,
    "description" TEXT,
    "picture" BYTEA,

    CONSTRAINT "pk_categories" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "customer_customer_demo" (
    "customer_id" CHAR NOT NULL,
    "customer_type_id" CHAR NOT NULL,

    CONSTRAINT "pk_customer_customer_demo" PRIMARY KEY ("customer_id","customer_type_id")
);

-- CreateTable
CREATE TABLE "customer_demographics" (
    "customer_type_id" CHAR NOT NULL,
    "customer_desc" TEXT,

    CONSTRAINT "pk_customer_demographics" PRIMARY KEY ("customer_type_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "customer_id" CHAR NOT NULL,
    "company_name" VARCHAR(40) NOT NULL,
    "contact_name" VARCHAR(30),
    "contact_title" VARCHAR(30),
    "address" VARCHAR(60),
    "city" VARCHAR(15),
    "region" VARCHAR(15),
    "postal_code" VARCHAR(10),
    "country" VARCHAR(15),
    "phone" VARCHAR(24),
    "fax" VARCHAR(24),

    CONSTRAINT "pk_customers" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "employee_territories" (
    "employee_id" SMALLINT NOT NULL,
    "territory_id" VARCHAR(20) NOT NULL,

    CONSTRAINT "pk_employee_territories" PRIMARY KEY ("employee_id","territory_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "employee_id" SMALLINT NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(10) NOT NULL,
    "title" VARCHAR(30),
    "title_of_courtesy" VARCHAR(25),
    "birth_date" DATE,
    "hire_date" DATE,
    "address" VARCHAR(60),
    "city" VARCHAR(15),
    "region" VARCHAR(15),
    "postal_code" VARCHAR(10),
    "country" VARCHAR(15),
    "home_phone" VARCHAR(24),
    "extension" VARCHAR(4),
    "photo" BYTEA,
    "notes" TEXT,
    "reports_to" SMALLINT,
    "photo_path" VARCHAR(255),

    CONSTRAINT "pk_employees" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "order_id" SMALLINT NOT NULL,
    "product_id" SMALLINT NOT NULL,
    "unit_price" REAL NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "discount" REAL NOT NULL,

    CONSTRAINT "pk_order_details" PRIMARY KEY ("order_id","product_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SMALLINT NOT NULL,
    "customer_id" CHAR,
    "employee_id" SMALLINT,
    "order_date" DATE,
    "required_date" DATE,
    "shipped_date" DATE,
    "ship_via" SMALLINT,
    "freight" REAL,
    "ship_name" VARCHAR(40),
    "ship_address" VARCHAR(60),
    "ship_city" VARCHAR(15),
    "ship_region" VARCHAR(15),
    "ship_postal_code" VARCHAR(10),
    "ship_country" VARCHAR(15),

    CONSTRAINT "pk_orders" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" SMALLINT NOT NULL,
    "product_name" VARCHAR(40) NOT NULL,
    "supplier_id" SMALLINT,
    "category_id" SMALLINT,
    "quantity_per_unit" VARCHAR(20),
    "unit_price" REAL,
    "units_in_stock" SMALLINT,
    "units_on_order" SMALLINT,
    "reorder_level" SMALLINT,
    "discontinued" INTEGER NOT NULL,

    CONSTRAINT "pk_products" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "region" (
    "region_id" SMALLINT NOT NULL,
    "region_description" CHAR NOT NULL,

    CONSTRAINT "pk_region" PRIMARY KEY ("region_id")
);

-- CreateTable
CREATE TABLE "shippers" (
    "shipper_id" SMALLINT NOT NULL,
    "company_name" VARCHAR(40) NOT NULL,
    "phone" VARCHAR(24),

    CONSTRAINT "pk_shippers" PRIMARY KEY ("shipper_id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "supplier_id" SMALLINT NOT NULL,
    "company_name" VARCHAR(40) NOT NULL,
    "contact_name" VARCHAR(30),
    "contact_title" VARCHAR(30),
    "address" VARCHAR(60),
    "city" VARCHAR(15),
    "region" VARCHAR(15),
    "postal_code" VARCHAR(10),
    "country" VARCHAR(15),
    "phone" VARCHAR(24),
    "fax" VARCHAR(24),
    "homepage" TEXT,

    CONSTRAINT "pk_suppliers" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "territories" (
    "territory_id" VARCHAR(20) NOT NULL,
    "territory_description" CHAR NOT NULL,
    "region_id" SMALLINT NOT NULL,

    CONSTRAINT "pk_territories" PRIMARY KEY ("territory_id")
);

-- CreateTable
CREATE TABLE "us_states" (
    "state_id" SMALLINT NOT NULL,
    "state_name" VARCHAR(100),
    "state_abbr" VARCHAR(2),
    "state_region" VARCHAR(50),

    CONSTRAINT "pk_usstates" PRIMARY KEY ("state_id")
);

-- AddForeignKey
ALTER TABLE "customer_customer_demo" ADD CONSTRAINT "fk_customer_customer_demo_customer_demographics" FOREIGN KEY ("customer_type_id") REFERENCES "customer_demographics"("customer_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_customer_demo" ADD CONSTRAINT "fk_customer_customer_demo_customers" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_territories" ADD CONSTRAINT "fk_employee_territories_employees" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_territories" ADD CONSTRAINT "fk_employee_territories_territories" FOREIGN KEY ("territory_id") REFERENCES "territories"("territory_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_employees" FOREIGN KEY ("reports_to") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "fk_order_details_orders" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "fk_order_details_products" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_customers" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_employees" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_shippers" FOREIGN KEY ("ship_via") REFERENCES "shippers"("shipper_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_categories" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_products_suppliers" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("supplier_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "territories" ADD CONSTRAINT "fk_territories_region" FOREIGN KEY ("region_id") REFERENCES "region"("region_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
