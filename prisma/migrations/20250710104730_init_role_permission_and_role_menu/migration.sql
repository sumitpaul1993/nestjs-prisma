-- CreateTable
CREATE TABLE "role_menu" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role_id" UUID NOT NULL,
    "menu_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role_id" UUID NOT NULL,
    "menu_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "role_menu_id_idx" ON "role_menu"("id");

-- CreateIndex
CREATE INDEX "role_permission_id_idx" ON "role_permission"("id");

-- AddForeignKey
ALTER TABLE "role_menu" ADD CONSTRAINT "role_menu_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_menu" ADD CONSTRAINT "role_menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
