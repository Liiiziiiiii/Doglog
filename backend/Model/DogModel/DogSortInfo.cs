using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using ApiProject.Model.UserModel;

namespace ApiProject.Model.DogModel
{
    public class DogSortInfo
    {
        public int Id { get; set; }
        public string Photo { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Breed { get; set; }

        public string Wool { get; set; }
        public int Age { get; set; }
        public UserDTO Owner { get; set; }


        public List<DogSortInfo> Puppies { get; set; } = new List<DogSortInfo>();

        public List<DogPhoto> Photos { get; set; } = new List<DogPhoto>();



    }
}
