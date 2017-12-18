using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Angular4App
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    static List<dynamic> customers = new List<dynamic>();
    public ValuesController()
    {
      if (customers.Count == 0)
      {
        for (int i = 0; i < 10; i++)
        {
          customers.Add(new
          {
            Id = i,
            Name = "Customer" + i,
            Description = "Description" + i
          });
        }
      }
    }
    // GET: api/values
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return new string[] { "value1", "value2", "value4", "value5" };
    }

    [Route("GetCustomers")]
    [HttpGet]
    public IEnumerable<object> GetCustomers()
    {
      return customers;
    }

    [Route("GetCustomer/{id}")]
    [HttpGet]
    public object CustomerDetails(int id)
    {
      var customer = customers.FirstOrDefault(x => x.Id == id);
      return customer;
    }

    [Route("UpdateCustomer")]
    [HttpPost]
    public void UpdateCustomer(Customer customer, string name)
    {
      //var customerToUpdate = customers.FirstOrDefault(x => x.Id == customer.id);
      //customerToUpdate.Name = customer.Name;
      //customerToUpdate.Description = customer.Description;
    }

    [Route("AddCustomer")]
    [HttpPost]
    public void AddCustomer(Customer customer)
    {
      customers.Add(customer);
    }
  }
}

public class Customer
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
}
