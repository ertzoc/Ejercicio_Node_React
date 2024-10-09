-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema empleados_crud
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema empleados_crud
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `empleados_crud` DEFAULT CHARACTER SET utf8mb4 ;
USE `empleados_crud` ;

-- -----------------------------------------------------
-- Table `empleados_crud`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `empleados_crud`.`empleados` (
  `idEmpleados` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `edad` INT NULL,
  `pais` VARCHAR(45) NULL,
  `cargo` VARCHAR(45) NULL,
  `anios` INT NULL,
  PRIMARY KEY (`idEmpleados`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
