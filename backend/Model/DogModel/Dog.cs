using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Dog
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Breed { get; set; }
    public string Wool { get; set; }
    public int Age { get; set; }

    [DataType(DataType.Date)]
    public DateTime DateBirth { get; set; }

    public string Sex { get; set; }
    public int Growth { get; set; }
    public int Weight { get; set; }
    public int KSY { get; set; }
    public string Namenursery { get; set; }
    public int? Chip { get; set; }
    public string Photo { get; set; }
    public bool? Puppies { get; set; } = false;
    public int UserId { get; set; }

    // Foreign Keys
    public int? Mother_Id { get; set; }
    public int? Father_Id { get; set; }

    // Navigation Properties
    [ForeignKey("Mother_Id")]
    public Dog? Mother { get; set; }

    [ForeignKey("Father_Id")]
    public Dog? Father { get; set; }
}
