using Microsoft.AspNetCore.Mvc;

namespace VOLT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APIController : ControllerBase
    {
        private readonly ILogger<APIController> _logger;

        public APIController(ILogger<APIController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("GetData")]
        public string Get()
        {
            return "lmao";
        }
        
        [HttpPost]
        [Route("PostData")]
        public void Post([FromBody]dynamic data)
        {
            string datastring = data.ToString();

        }
    }
}