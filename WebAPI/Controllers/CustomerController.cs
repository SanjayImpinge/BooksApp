using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        // static List<Customer> customers = new List<Customer>();
        static List<Book> books = new List<Book>();
        public CustomerController()
        {
            if (books.Count == 0)
            {
                for (int i = 0; i < 10; i++)
                {
                    books.Add(new Book
                    {
                        id = i,
                        name = "Book" + i,
                        author = "author" + i,
                        pages = "20",
                        dateofpublication = DateTime.Now.ToString("mm-dd-yyyy")
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
        [HttpPost]
        public IHttpActionResult GetCustomers(PagedModel model)
        {
            PagedResponse<List<Book>> pagedData = new PagedResponse<List<Book>>();
            pagedData.Total = books.Count();
            double pageCount = (double)(pagedData.Total / model.ItemsPerPage);
            pagedData.NumberOfPages = (int)Math.Ceiling(pageCount);

            int pageToSkip = (model.PageNumber - 1) * model.ItemsPerPage;

            pagedData.Data = books.Skip(pageToSkip).Take(model.ItemsPerPage).ToList();

            return Ok(pagedData);
        }

        [Route("GetCustomer/{id}")]
        [HttpGet]
        public object CustomerDetails(int id)
        {
            var customer = books.FirstOrDefault(x => x.id == id);
            return customer;
        }

        [Route("UpdateCustomer")]
        [HttpPost]
        public void UpdateCustomer(Book book)
        {
            var bookUpdate = books.FirstOrDefault(x => x.id == book.id);
           bookUpdate.name = book.name;
           bookUpdate.author = book.author;
           bookUpdate.pages = book.pages;
            bookUpdate.dateofpublication = book.dateofpublication;
            // customerToUpdate.description = customer.description;
        }

        [Route("AddCustomer")]
        [HttpPost]
        public void AddCustomer(Book book)
        {
            books.Add(book);
        }

        [Route("DeleteCustomer/{id}")]
        [HttpPost]
        public object DeleteCustomer(int id)
        {
            var book = books.FirstOrDefault(x => x.id == id);
            books.Remove(book);
            return book;
        }
    }
}

public class Customer
{
    public int id { get; set; }
    public string name { get; set; }
    public string description { get; set; }
}
public class Book
{
    public int id { get; set; }
    public string name { get; set; }
    public string author { get; set; }
    public string pages { get; set; }
    public string dateofpublication { get; set; }
}

public class PagedResponse<T>
{
    public int Total { get; set; }
    public int NumberOfPages { get; set; }
    public T Data { get; set; }
}
public class PagedModel
{
    public int PageNumber { get; set; }
    public int ItemsPerPage { get; set; }
}

