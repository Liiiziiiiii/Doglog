using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ApiProject.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dogs",
                columns: table => new
                {
                    Dog_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(100)", nullable: false),
                    Breed = table.Column<string>(type: "varchar(100)", nullable: false),
                    Wool = table.Column<string>(type: "varchar(100)", nullable: false),
                    DateBirth = table.Column<DateTime>(type: "timestamp", nullable: false),
                    Sex = table.Column<string>(type: "varchar(10)", nullable: false),
                    Growth = table.Column<int>(type: "integer", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    Chip = table.Column<int>(type: "integer", nullable: true),
                    Mother_Id = table.Column<int>(type: "integer", nullable: true),
                    Father_Id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dogs", x => x.Dog_Id);
                    table.ForeignKey(
                        name: "FK_dogs_dogs_Father_Id",
                        column: x => x.Father_Id,
                        principalTable: "dogs",
                        principalColumn: "Dog_Id");
                    table.ForeignKey(
                        name: "FK_dogs_dogs_Mother_Id",
                        column: x => x.Mother_Id,
                        principalTable: "dogs",
                        principalColumn: "Dog_Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_dogs_Father_Id",
                table: "dogs",
                column: "Father_Id");

            migrationBuilder.CreateIndex(
                name: "IX_dogs_Mother_Id",
                table: "dogs",
                column: "Mother_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dogs");
        }
    }
}
