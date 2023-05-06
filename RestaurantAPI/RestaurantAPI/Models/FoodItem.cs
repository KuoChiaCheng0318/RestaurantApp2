using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models
{
    public class FoodItem
    {
        [Key]
        public int FoodItemId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string FoodItemName { get; set; }

        public decimal Price { get; set; }
    }
}
