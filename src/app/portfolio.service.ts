import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  getProfile(): Observable<any> {
    return of({
      name: "Devyansh Bansal",
      title: "Software Engineer & Data Enthusiast",
      summary: "Passionate Software Engineer with experience in building robust scalable systems and data pipelines.",
      email: "devyanshbansal123@gmail.com",
      linkedin: "https://www.linkedin.com/in/devyansh-bansal/",
      github: "https://github.com/Dev7814",
      leetcode: "https://leetcode.com/u/erenyeager7814/"
    });
  }

  getExperience(): Observable<any[]> {
    return of([
      {
        company: "American Express",
        role: "Associate – Product Development (Credit & Fraud Risk)",
        duration: "Jan 2026 - Present",
        details: [
          "Develop and maintain Java-based backend systems for data quality validation using Event Engine, HBase, and Hive.",
          "Designed scalable validation logic for high-volume financial datasets ensuring reliability and consistency.",
          "Contributed to migration of legacy system to Qalibrate (GCP) leveraging BigQuery and cloud-native transformations.",
          "Refactored backend modules for improved scalability and maintainability in distributed environments.",
          "Collaborated across teams to integrate new services and optimize system workflows.",
          "Developed and enhanced data quality rules to identify anomalies and inconsistencies in credit and fraud datasets, improving overall data reliability."
        ]
      },
      {
        company: "Coforge",
        role: "Software Engineer – Data Platforms",
        duration: "Jul 2024 - Dec 2025",
        details: [
          "Achieved 94% in comprehensive Data Engineering training program.",
          "Developed and optimized an e-commerce data pipeline, improving processing efficiency by 30%.",
          "Orchestrated real-time and batch ingestion using Azure Databricks, Event Hub, and Data Factory.",
          "Designed data solutions using Azure SQL and Data Lake, enabling 20% faster analytical queries.",
          "Implemented security using Key Vault, RBAC, and VNets to ensure data confidentiality.",
          "Worked with Matillion ETL, dbt, and Snowflake to build and manage scalable data transformation workflows."
        ]
      }
    ]);
  }

  getProjects(): Observable<any[]> {
    return of([
      {
        title: "Ansell & Henry Schein Data Pipeline",
        date: "Feb 2024",
        details: [
          "Developed a robust ETL pipeline using Azure Data Factory and PostgreSQL to ingest raw CSV data.",
          "Automated data transformation workflows from raw to silver layer using dimension and fact table structure.",
          "Integrated cleaned data into Power BI dashboards for actionable insights."
        ],
        techStack: ["cloud Azure Data Factory", "database PostgreSQL", "hard_drive Azure Blob", "bar_chart Power BI"],
        githubLink: "https://github.com/Dev7814/ansell-pipeline"
      },
      {
        title: "E-commerce Data Pipeline",
        date: "Mar 2024",
        details: [
          "Developed a pipeline to analyze customer behavior, increasing insights by 25%.",
          "Engineered real-time processing using Azure Event Hub and Databricks.",
          "Designed scalable architecture supporting both real-time and batch processing workloads."
        ],
        techStack: ["bolt Databricks", "cloud_sync Event Hub", "account_tree Logic Apps", "storage SQL Server"],
        githubLink: "https://github.com/Dev7814/ecommerce-pipeline"
      }
    ]);
  }

  getSkills(): Observable<any> {
    return of({
      "Languages": ["terminal Java", "terminal Python", "database SQL", "terminal C++", "javascript JavaScript"],
      "Backend": ["energy_program_saving Spring Boot", "api REST APIs", "hub Distributed Systems"],
      "Databases": ["storage HBase", "storage Hive", "manage_search BigQuery", "database SQL Server", "dataset MongoDB"],
      "Cloud & Tools": ["cloud GCP", "cloud Azure", "cloud AWS", "view_in_ar Docker", "account_tree Kubernetes", "integration_instructions GitHub Actions"]
    });
  }

  getAchievements(): Observable<string[]> {
    return of([
      "Solved 500+ data structure and algorithm problems on LeetCode.",
      "Awarded Merit Scholarship for outstanding academic performance."
    ]);
  }
}
