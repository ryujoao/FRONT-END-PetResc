/*
  Warnings:

  - You are about to drop the `animals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `animals` DROP FOREIGN KEY `animals_ongId_fkey`;

-- DropForeignKey
ALTER TABLE `denuncias` DROP FOREIGN KEY `denuncias_animalId_fkey`;

-- DropForeignKey
ALTER TABLE `fichas` DROP FOREIGN KEY `fichas_animalId_fkey`;

-- DropIndex
DROP INDEX `denuncias_animalId_fkey` ON `denuncias`;

-- DropTable
DROP TABLE `animals`;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `especie` VARCHAR(191) NOT NULL,
    `raca` VARCHAR(191) NULL,
    `idade` INTEGER NULL,
    `status` ENUM('DISPONIVEL', 'ADOTADO', 'SOBRE_TRATAMENTO') NOT NULL DEFAULT 'DISPONIVEL',
    `porte` VARCHAR(191) NULL,
    `sexo` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `photoURL` VARCHAR(191) NULL,
    `corPredominante` VARCHAR(191) NULL,
    `ongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `ongId` INTEGER NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LarTemporario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `ongId` INTEGER NOT NULL,
    `animalId` INTEGER NULL,
    `nomeCompleto` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `tipoMoradia` VARCHAR(191) NOT NULL,
    `possuiQuintal` BOOLEAN NOT NULL,
    `portesAceitos` VARCHAR(191) NOT NULL,
    `especiesAceitas` VARCHAR(191) NOT NULL,
    `possuiAnimais` BOOLEAN NOT NULL,
    `experiencia` VARCHAR(191) NULL,
    `dispoVeterinario` VARCHAR(191) NULL,
    `podeFornecerRacao` BOOLEAN NOT NULL,
    `precisaAjudaONG` BOOLEAN NOT NULL,
    `periodoDisponibilidade` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'EM_ANALISE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_ongId_fkey` FOREIGN KEY (`ongId`) REFERENCES `Ong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doacao` ADD CONSTRAINT `Doacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doacao` ADD CONSTRAINT `Doacao_ongId_fkey` FOREIGN KEY (`ongId`) REFERENCES `Ong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LarTemporario` ADD CONSTRAINT `LarTemporario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LarTemporario` ADD CONSTRAINT `LarTemporario_ongId_fkey` FOREIGN KEY (`ongId`) REFERENCES `Ong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LarTemporario` ADD CONSTRAINT `LarTemporario_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fichas` ADD CONSTRAINT `fichas_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `denuncias_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
