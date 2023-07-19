//#region structure
type JsonPrimitive = null | number | string | boolean;
type NestedArray<V> = Array<V | NestedArray<V>>;
type Nested<V> = V | { [s: string]: V | Nested<V> } | Array<V | Nested<V>>;
type Json = Nested<JsonPrimitive>;

interface Table_public_prisma_migrations {
  "id": string;
  "checksum": string;
  "finished_at": string | null;
  "migration_name": string;
  "logs": string | null;
  "rolled_back_at": string | null;
  "started_at": string;
  "applied_steps_count": number;
}
interface Table_storage_buckets {
  "id": string;
  "name": string;
  "owner": string | null;
  "created_at": string | null;
  "updated_at": string | null;
  "public": boolean | null;
  "avif_autodetection": boolean | null;
  "file_size_limit": number | null;
  "allowed_mime_types": NestedArray<string | null>;
}
interface Table_public_categories {
  "category_id": number;
  "category_name": string;
  "description": string | null;
  "picture": string | null;
}
interface Table_public_customer_customer_demo {
  "customer_id": string;
  "customer_type_id": string;
}
interface Table_public_customer_demographics {
  "customer_type_id": string;
  "customer_desc": string | null;
}
interface Table_public_customers {
  "customer_id": string;
  "company_name": string;
  "contact_name": string | null;
  "contact_title": string | null;
  "address": string | null;
  "city": string | null;
  "region": string | null;
  "postal_code": string | null;
  "country": string | null;
  "phone": string | null;
  "fax": string | null;
}
interface Table_public_employee_territories {
  "employee_id": number;
  "territory_id": string;
}
interface Table_public_employees {
  "employee_id": number;
  "last_name": string;
  "first_name": string;
  "title": string | null;
  "title_of_courtesy": string | null;
  "birth_date": string | null;
  "hire_date": string | null;
  "address": string | null;
  "city": string | null;
  "region": string | null;
  "postal_code": string | null;
  "country": string | null;
  "home_phone": string | null;
  "extension": string | null;
  "photo": string | null;
  "notes": string | null;
  "reports_to": number | null;
  "photo_path": string | null;
}
interface Table_storage_migrations {
  "id": number;
  "name": string;
  "hash": string;
  "executed_at": string | null;
}
interface Table_storage_objects {
  "id": string;
  "bucket_id": string | null;
  "name": string | null;
  "owner": string | null;
  "created_at": string | null;
  "updated_at": string | null;
  "last_accessed_at": string | null;
  "metadata": Json | null;
  "path_tokens": NestedArray<string | null>;
}
interface Table_public_order_details {
  "order_id": number;
  "product_id": number;
  "unit_price": number;
  "quantity": number;
  "discount": number;
}
interface Table_public_orders {
  "order_id": number;
  "customer_id": string | null;
  "employee_id": number | null;
  "order_date": string | null;
  "required_date": string | null;
  "shipped_date": string | null;
  "ship_via": number | null;
  "freight": number | null;
  "ship_name": string | null;
  "ship_address": string | null;
  "ship_city": string | null;
  "ship_region": string | null;
  "ship_postal_code": string | null;
  "ship_country": string | null;
}
interface Table_public_products {
  "product_id": number;
  "product_name": string;
  "supplier_id": number | null;
  "category_id": number | null;
  "quantity_per_unit": string | null;
  "unit_price": number | null;
  "units_in_stock": number | null;
  "units_on_order": number | null;
  "reorder_level": number | null;
  "discontinued": number;
}
interface Table_public_region {
  "region_id": number;
  "region_description": string;
}
interface Table_public_shippers {
  "shipper_id": number;
  "company_name": string;
  "phone": string | null;
}
interface Table_public_suppliers {
  "supplier_id": number;
  "company_name": string;
  "contact_name": string | null;
  "contact_title": string | null;
  "address": string | null;
  "city": string | null;
  "region": string | null;
  "postal_code": string | null;
  "country": string | null;
  "phone": string | null;
  "fax": string | null;
  "homepage": string | null;
}
interface Table_public_territories {
  "territory_id": string;
  "territory_description": string;
  "region_id": number;
}
interface Table_public_us_states {
  "state_id": number;
  "state_name": string | null;
  "state_abbr": string | null;
  "state_region": string | null;
}
interface Schema_public {
  "_prisma_migrations": Table_public_prisma_migrations;
  "categories": Table_public_categories;
  "customer_customer_demo": Table_public_customer_customer_demo;
  "customer_demographics": Table_public_customer_demographics;
  "customers": Table_public_customers;
  "employee_territories": Table_public_employee_territories;
  "employees": Table_public_employees;
  "order_details": Table_public_order_details;
  "orders": Table_public_orders;
  "products": Table_public_products;
  "region": Table_public_region;
  "shippers": Table_public_shippers;
  "suppliers": Table_public_suppliers;
  "territories": Table_public_territories;
  "us_states": Table_public_us_states;
}
interface Schema_graphql_public {

}
interface Schema_pgsodium {

}
interface Schema_realtime {

}
interface Schema_storage {
  "buckets": Table_storage_buckets;
  "migrations": Table_storage_migrations;
  "objects": Table_storage_objects;
}
interface Database {
  "public": Schema_public;
  "graphql_public": Schema_graphql_public;
  "pgsodium": Schema_pgsodium;
  "realtime": Schema_realtime;
  "storage": Schema_storage;
}
interface Extension {

}
//#endregion

//#region select
type SelectedTable = { id: string; schema: string; table: string };

type SelectDefault = {
  /**
   * Define the "default" behavior to use for the tables in the schema.
   * If true, select all tables in the schema.
   * If false, select no tables in the schema.
   * If "structure", select only the structure of the tables in the schema but not the data.
   * @defaultValue true
   */
  $default?: SelectObject;
};

type DefaultKey = keyof SelectDefault;

type SelectObject = boolean | "structure";

type ExtensionsSelect<TSchema extends keyof Database> =
  TSchema extends keyof Extension
    ? {
        /**
         * Define if you want to select the extension data.
         * @defaultValue false
         */
        $extensions?:
          | boolean
          | {
              [TExtension in Extension[TSchema]]?: boolean;
            };
      }
    : {};

type SelectConfig = SelectDefault & {
  [TSchema in keyof Database]?:
    | SelectObject
    | (SelectDefault &
        ExtensionsSelect<TSchema> & {
          [TTable in keyof Database[TSchema]]?: SelectObject;
        });
};

// Apply the __default key if it exists to each level of the select config (schemas and tables)
type ApplyDefault<TSelectConfig extends SelectConfig> = {
  [TSchema in keyof Database]-?: {
    [TTable in keyof Database[TSchema]]-?: TSelectConfig[TSchema] extends SelectObject
      ? TSelectConfig[TSchema]
      : TSelectConfig[TSchema] extends Record<any, any>
      ? TSelectConfig[TSchema][TTable] extends SelectObject
        ? TSelectConfig[TSchema][TTable]
        : TSelectConfig[TSchema][DefaultKey] extends SelectObject
        ? TSelectConfig[TSchema][DefaultKey]
        : TSelectConfig[DefaultKey] extends SelectObject
        ? TSelectConfig[DefaultKey]
        : true
      : TSelectConfig[DefaultKey] extends SelectObject
      ? TSelectConfig[DefaultKey]
      : true;
  };
};

type ExtractValues<T> = T extends object ? T[keyof T] : never;

type GetSelectedTable<TSelectSchemas extends SelectConfig> = ExtractValues<
  ExtractValues<{
    [TSchema in keyof TSelectSchemas]: {
      [TTable in keyof TSelectSchemas[TSchema] as TSelectSchemas[TSchema][TTable] extends true
        ? TTable
        : never]: TSchema extends string
        ? TTable extends string
          ? { id: `${TSchema}.${TTable}`; schema: TSchema; table: TTable }
          : never
        : never;
    };
  }>
>;
//#endregion

//#region transform
type TransformMode = "auto" | "strict" | "unsafe" | undefined;


type TransformOptions<TTransformMode extends TransformMode> = {
  /**
   * The type for defining the transform mode.
   *
   * There are three modes available:
   *
   * - "auto" - Automatically transform the data for any columns, tables or schemas that have not been specified in the config
   * - "strict" - In this mode, Snaplet expects a transformation to be given in the config for every column in the database. If any columns have not been provided in the config, Snaplet will not capture the snapshot, but instead tell you which columns, tables, or schemas have not been given
   * - "unsafe" - This mode copies over values without any transformation. If a transformation is given for a column in the config, the transformation will be used instead
   * @defaultValue "unsafe"
   */
  $mode?: TTransformMode;
  /**
   * If true, parse JSON objects during transformation.
   * @defaultValue false
   */
  $parseJson?: boolean;
};

type DatabaseWithCallback = {
  [TSchema in keyof Database]: {
    [TTable in keyof Database[TSchema]]:
      | ((ctx: {
          row: Database[TSchema][TTable];
          rowIndex: number;
        }) => Database[TSchema][TTable])
      | Database[TSchema][TTable];
  };
};

type SelectDatabase<TSelectedTable extends SelectedTable> = {
  [TSchema in keyof DatabaseWithCallback as TSchema extends NonNullable<TSelectedTable>["schema"]
    ? TSchema
    : never]: {
    [TTable in keyof DatabaseWithCallback[TSchema] as TTable extends Extract<
      TSelectedTable,
      { schema: TSchema }
    >["table"]
      ? TTable
      : never]: DatabaseWithCallback[TSchema][TTable];
  };
};

type PartialTransform<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => Partial<R>
  : Partial<T>;

type IsNever<T> = [T] extends [never] ? true : false;

type TransformConfig<
  TTransformMode extends TransformMode,
  TSelectedTable extends SelectedTable
> = TransformOptions<TTransformMode> &
  (IsNever<TSelectedTable> extends true
    ? never
    : SelectDatabase<TSelectedTable> extends infer TSelectedDatabase
    ? TTransformMode extends "strict"
      ? TSelectedDatabase
      : {
          [TSchema in keyof TSelectedDatabase]?: {
            [TTable in keyof TSelectedDatabase[TSchema]]?: PartialTransform<
              TSelectedDatabase[TSchema][TTable]
            >;
          };
        }
    : never);
//#endregion

//#region subset
type NonEmptyArray<T> = [T, ...T[]];

/**
 * Represents an exclusive row limit percent.
 */
type ExclusiveRowLimitPercent =
| {
  percent?: never;
  /**
   * Represents a strict limit of the number of rows captured on target
   */
  rowLimit: number
}
| {
  /**
   * Represents a random percent to be captured on target (1-100)
   */
  percent: number;
  rowLimit?: never
}

// Get the type of a target in the config.subset.targets array
type SubsetTarget<TSelectedTable extends SelectedTable> = {
  /**
   * The ID of the table to target
   */
  table: TSelectedTable["id"];
  /**
   * The order on which your target will be filtered useful with rowLimit parameter
   *
   * @example
   * orderBy: `"User"."createdAt" desc`
   */
  orderBy?: string;
} & (
  | {
    /**
     * The where filter to be applied on the target
     *
     * @example
     * where: `"_prisma_migrations"."name" IN ('migration1', 'migration2')`
     */
    where: string
  } & Partial<ExclusiveRowLimitPercent>
  | {
    /**
     * The where filter to be applied on the target
     */
    where?: string
  } & ExclusiveRowLimitPercent
);

/**
 * Represents the configuration for subsetting the snapshot.
 */
type SubsetConfig<TSelectedTable extends SelectedTable> = {
  /**
   * Specifies whether subsetting is enabled.
   *  @defaultValue true
   */
  enabled?: boolean;

  /**
   * Specifies the version of the subsetting algorithm
   *
   * @defaultValue "3"
   * @deprecated
   */
  version?: "1" | "2" | "3";

  /**
   * Specifies whether to eagerly load related tables.
   * @defaultValue false
   */
  eager?: boolean;

  /**
   * Specifies whether to keep tables that are not connected to any other tables.
   * @defaultValue false
   */
  keepDisconnectedTables?: boolean;

  /**
   * Specifies whether to follow nullable relations.
   * @defaultValue false
   */
  followNullableRelations?: boolean;

  /**
   *  Specifies the maximum number of children per node.
   */
  maxChildrenPerNode?: number;

  /**
   * Specifies the maximum number of cycles in a loop.
   * @defaultValue 10
   */
  maxCyclesLoop?: number;

  /**
   * Specifies the root targets for subsetting. Must be a non-empty array
   */
  targets: NonEmptyArray<SubsetTarget<TSelectedTable>>;
}
//#endregion

type Validate<T, Target> = {
  [K in keyof T]: K extends keyof Target ? T[K] : never;
};

type TypedConfig<
  TSelectConfig extends SelectConfig,
  TTransformMode extends TransformMode
> =  GetSelectedTable<
  ApplyDefault<TSelectConfig>
> extends SelectedTable
  ? {
    /**
     * Parameter to configure the inclusion/exclusion of schemas and tables from the snapshot.
     * {@link https://docs.snaplet.dev/references/data-operations/exclude}
     */
      select?: Validate<TSelectConfig, SelectConfig>;
      /**
       * Parameter to configure the transformations applied to the data.
       * {@link https://docs.snaplet.dev/references/data-operations/transform}
       */
      transform?: TransformConfig<TTransformMode, GetSelectedTable<
  ApplyDefault<TSelectConfig>
>>;
      /**
       * Parameter to capture a subset of the data.
       * {@link https://docs.snaplet.dev/references/data-operations/reduce}
       */
      subset?: SubsetConfig<GetSelectedTable<
  ApplyDefault<TSelectConfig>
>>;
    }
  : never;

declare module "snaplet" {
    /**
     * Define the configuration for Snaplet capture process.
     * {@link https://docs.snaplet.dev/getting-started/data-operations}
     */
    export function defineConfig<
    TSelectConfig extends SelectConfig,
    TTransformMode extends TransformMode = undefined
  >(
    config: TypedConfig<TSelectConfig, TTransformMode>
  ): TypedConfig<TSelectConfig, TTransformMode>;
}