using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Model
{
    public class DogDb
    {
        [Key]
        public int Dog_Id { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Breed { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Wool { get; set; }

        [Column(TypeName = "timestamp")]
        public DateTime DateBirth { get; set; }

        [Column(TypeName = "varchar(10)")]
        public string Sex { get; set; }

        public int Growth { get; set; }
        public int Weight { get; set; }
        public int? Chip { get; set; }

        // Foreign Keys
        public int? Mother_Id { get; set; }
        public int? Father_Id { get; set; }

        // Navigation Properties
        [ForeignKey("Mother_Id")]
        public DogDb? Mother { get; set; }

        [ForeignKey("Father_Id")]
        public DogDb? Father { get; set; }
    }
}
