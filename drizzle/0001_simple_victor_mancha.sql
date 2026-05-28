CREATE TABLE `benchmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`specialty` varchar(64) NOT NULL,
	`metric` varchar(64) NOT NULL,
	`medianValue` decimal(12,2) NOT NULL,
	`percentile25` decimal(12,2),
	`percentile75` decimal(12,2),
	`flagThreshold` decimal(12,2),
	`higherIsBetter` int NOT NULL DEFAULT 1,
	`unit` varchar(16),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `benchmarks_id` PRIMARY KEY(`id`),
	CONSTRAINT `benchmarks_specialty_metric_idx` UNIQUE(`specialty`,`metric`)
);
--> statement-breakpoint
CREATE TABLE `briefings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`practiceId` int NOT NULL,
	`kpiSubmissionId` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`executiveSummary` text NOT NULL,
	`narrative` text NOT NULL,
	`recommendations` text,
	`status` enum('draft','published','delivered') NOT NULL DEFAULT 'published',
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `briefings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kpiSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`practiceId` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	`revenuePerProvider` decimal(12,2),
	`daysInAR` int,
	`netCollectionRate` decimal(5,2),
	`contractualAdjustmentRate` decimal(5,2),
	`insuranceMixCommercial` decimal(5,2),
	`avgReimbursementRate` decimal(5,2),
	`thirdNextAvailable` int,
	`noShowRate` decimal(5,2),
	`schedulingEfficiency` decimal(5,2),
	`staffToProviderRatio` decimal(5,2),
	`providerTurnoverRate` decimal(5,2),
	`staffTrainingInvestment` decimal(5,2),
	`operatingExpenseRatio` decimal(5,2),
	`costPerPatientVisit` decimal(10,2),
	`patientSatisfactionScore` decimal(3,2),
	`qualityComplianceRate` decimal(5,2),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `kpiSubmissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `kpi_submissions_period_idx` UNIQUE(`practiceId`,`year`,`month`)
);
--> statement-breakpoint
CREATE TABLE `practices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`specialty` varchar(64) NOT NULL,
	`providerCount` int NOT NULL DEFAULT 1,
	`groupTier` enum('solo','group') NOT NULL DEFAULT 'solo',
	`monthlyRate` decimal(10,2),
	`subscriptionStatus` enum('trial','active','canceled','past_due') NOT NULL DEFAULT 'trial',
	`contactEmail` varchar(320),
	`region` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `practices_id` PRIMARY KEY(`id`),
	CONSTRAINT `practices_userId_idx` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE INDEX `briefings_period_idx` ON `briefings` (`practiceId`,`year`,`month`);--> statement-breakpoint
CREATE INDEX `practices_specialty_idx` ON `practices` (`specialty`);