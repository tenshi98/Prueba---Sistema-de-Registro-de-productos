/*
 Navicat Premium Data Transfer

 Source Server         : postgresLocal
 Source Server Type    : PostgreSQL
 Source Server Version : 170004 (170004)
 Source Host           : localhost:5432
 Source Catalog        : prueba
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170004 (170004)
 File Encoding         : 65001

 Date: 11/03/2025 16:01:01
*/


-- ----------------------------
-- Sequence structure for productos_listado_id_producto_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."productos_listado_id_producto_seq";
CREATE SEQUENCE "public"."productos_listado_id_producto_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for bodegas_listado
-- ----------------------------
DROP TABLE IF EXISTS "public"."bodegas_listado";
CREATE TABLE "public"."bodegas_listado" (
  "id_bodega" int8 NOT NULL,
  "nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of bodegas_listado
-- ----------------------------
INSERT INTO "public"."bodegas_listado" VALUES (1, 'Bodega 1');
INSERT INTO "public"."bodegas_listado" VALUES (2, 'Bodega 2');
INSERT INTO "public"."bodegas_listado" VALUES (3, 'Bodega 3');
INSERT INTO "public"."bodegas_listado" VALUES (4, 'Bodega 4');

-- ----------------------------
-- Table structure for monedas_listado
-- ----------------------------
DROP TABLE IF EXISTS "public"."monedas_listado";
CREATE TABLE "public"."monedas_listado" (
  "id_moneda" int8 NOT NULL,
  "nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of monedas_listado
-- ----------------------------
INSERT INTO "public"."monedas_listado" VALUES (1, 'Pesos');
INSERT INTO "public"."monedas_listado" VALUES (2, 'Dolares');
INSERT INTO "public"."monedas_listado" VALUES (3, 'Euros');
INSERT INTO "public"."monedas_listado" VALUES (4, 'Libras');

-- ----------------------------
-- Table structure for productos_listado
-- ----------------------------
DROP TABLE IF EXISTS "public"."productos_listado";
CREATE TABLE "public"."productos_listado" (
  "id_producto" int8 NOT NULL DEFAULT nextval('productos_listado_id_producto_seq'::regclass),
  "id_bodega" int8 NOT NULL,
  "id_sucursal" int8 NOT NULL,
  "id_moneda" int8 NOT NULL,
  "codigo" varchar(15) COLLATE "pg_catalog"."default" NOT NULL,
  "nombre" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "precio" numeric(10,2) NOT NULL,
  "checkbox_1" int2,
  "checkbox_2" int2,
  "checkbox_3" int2,
  "checkbox_4" int2,
  "checkbox_5" int2,
  "descripcion" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for sucursales_listado
-- ----------------------------
DROP TABLE IF EXISTS "public"."sucursales_listado";
CREATE TABLE "public"."sucursales_listado" (
  "id_sucursal" int8 NOT NULL,
  "id_bodega" int8 NOT NULL,
  "nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of sucursales_listado
-- ----------------------------
INSERT INTO "public"."sucursales_listado" VALUES (1, 1, 'B1 Sucursal 1');
INSERT INTO "public"."sucursales_listado" VALUES (2, 1, 'B1 Sucursal 2');
INSERT INTO "public"."sucursales_listado" VALUES (3, 2, 'B2 Sucursal 1');
INSERT INTO "public"."sucursales_listado" VALUES (4, 2, 'B2 Sucursal 2');
INSERT INTO "public"."sucursales_listado" VALUES (5, 2, 'B2 Sucursal 3');
INSERT INTO "public"."sucursales_listado" VALUES (6, 3, 'B3 Sucursal 1');
INSERT INTO "public"."sucursales_listado" VALUES (7, 4, 'B4 Sucursal 1');
INSERT INTO "public"."sucursales_listado" VALUES (8, 4, 'B4 Sucursal 2');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."productos_listado_id_producto_seq"
OWNED BY "public"."productos_listado"."id_producto";
SELECT setval('"public"."productos_listado_id_producto_seq"', 5, true);

-- ----------------------------
-- Primary Key structure for table bodegas_listado
-- ----------------------------
ALTER TABLE "public"."bodegas_listado" ADD CONSTRAINT "bodegas_listado_pkey" PRIMARY KEY ("id_bodega");

-- ----------------------------
-- Primary Key structure for table monedas_listado
-- ----------------------------
ALTER TABLE "public"."monedas_listado" ADD CONSTRAINT "monedas_listado_pkey" PRIMARY KEY ("id_moneda");

-- ----------------------------
-- Primary Key structure for table productos_listado
-- ----------------------------
ALTER TABLE "public"."productos_listado" ADD CONSTRAINT "productos_listado_pkey1" PRIMARY KEY ("id_producto");

-- ----------------------------
-- Primary Key structure for table sucursales_listado
-- ----------------------------
ALTER TABLE "public"."sucursales_listado" ADD CONSTRAINT "sucursales_listado_pkey" PRIMARY KEY ("id_sucursal");
