-- CreateTable
CREATE TABLE "categories" (
    "category_id" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    "description" TEXT,
    "picture" BYTEA,

    CONSTRAINT "pk_categories" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "customer_customer_demo" (
    "customer_id" TEXT NOT NULL,
    "customer_type_id" TEXT NOT NULL,

    CONSTRAINT "pk_customer_customer_demo" PRIMARY KEY ("customer_id","customer_type_id")
);

-- CreateTable
CREATE TABLE "customer_demographics" (
    "customer_type_id" TEXT NOT NULL,
    "customer_desc" TEXT,

    CONSTRAINT "pk_customer_demographics" PRIMARY KEY ("customer_type_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "customer_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT,
    "contact_title" TEXT,
    "address" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "fax" TEXT,

    CONSTRAINT "pk_customers" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "employee_territories" (
    "employee_id" INTEGER NOT NULL,
    "territory_id" TEXT NOT NULL,

    CONSTRAINT "pk_employee_territories" PRIMARY KEY ("employee_id","territory_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "employee_id" INTEGER NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "title" TEXT,
    "title_of_courtesy" TEXT,
    "birth_date" TIMESTAMP(3),
    "hire_date" TIMESTAMP(3),
    "address" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "home_phone" TEXT,
    "extension" TEXT,
    "photo" BYTEA,
    "notes" TEXT,
    "reports_to" INTEGER,
    "photo_path" TEXT,

    CONSTRAINT "pk_employees" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pk_order_details" PRIMARY KEY ("order_id","product_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" INTEGER NOT NULL,
    "customer_id" TEXT,
    "employee_id" INTEGER,
    "order_date" TIMESTAMP(3),
    "required_date" TIMESTAMP(3),
    "shipped_date" TIMESTAMP(3),
    "ship_via" INTEGER,
    "freight" DOUBLE PRECISION,
    "ship_name" TEXT,
    "ship_address" TEXT,
    "ship_city" TEXT,
    "ship_region" TEXT,
    "ship_postal_code" TEXT,
    "ship_country" TEXT,

    CONSTRAINT "pk_orders" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "supplier_id" INTEGER,
    "category_id" INTEGER,
    "quantity_per_unit" TEXT,
    "unit_price" DOUBLE PRECISION,
    "units_in_stock" INTEGER,
    "units_on_order" INTEGER,
    "reorder_level" INTEGER,
    "discontinued" INTEGER NOT NULL,

    CONSTRAINT "pk_products" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "region" (
    "region_id" INTEGER NOT NULL,
    "region_description" TEXT NOT NULL,

    CONSTRAINT "pk_region" PRIMARY KEY ("region_id")
);

-- CreateTable
CREATE TABLE "shippers" (
    "shipper_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "pk_shippers" PRIMARY KEY ("shipper_id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "supplier_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT,
    "contact_title" TEXT,
    "address" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "homepage" TEXT,

    CONSTRAINT "pk_suppliers" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "territories" (
    "territory_id" TEXT NOT NULL,
    "territory_description" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "pk_territories" PRIMARY KEY ("territory_id")
);

-- CreateTable
CREATE TABLE "us_states" (
    "state_id" INTEGER NOT NULL,
    "state_name" TEXT,
    "state_abbr" TEXT,
    "state_region" TEXT,

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
