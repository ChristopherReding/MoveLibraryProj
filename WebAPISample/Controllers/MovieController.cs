﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/movie")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {

            // Retrieve all movies from db logic
            var MovieList = _context.Movies.ToList();
            return Ok( MovieList );
            //return Ok(new string[] { "movie1 string", "movie2 string" });
            //return JsonResult(new
            //{
            //    msg = String.Format("Fist Name: {0}", values[0])
            //});

        }
        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Movie movie = _context.Movies.Where(m => m.MovieId == id).Single();
            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok("It worked!");
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie value)
        {
            _context.Movies.Update(value);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Movie movie = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            // Delete movie from db logic
            return Ok();
        }
    }
}