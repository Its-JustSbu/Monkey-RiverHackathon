using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using team28HackathonAPI.Controllers;
using team28HackathonAPI.DBContext;
using team28HackathonAPI.Models.Repositories.AuthRepo;
using team28HackathonAPI.Models.Repositories.CRUDRepository;
using team28HackathonAPI.Models.ViewModels;

namespace team28HackathonAPITests.ControllerTests
{
    public class UserControllerTests
    {
        private readonly IAuthRepository authRepository;
        private readonly string _connectionString = "Server=(LOCALDB)\\MSSQLLOCALDB;Database=TEAM28MR;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True";
        public UserControllerTests()
        {
            authRepository = A.Fake<IAuthRepository>();
        }
        [Fact]
        public async Task CanConnectToDatabase()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    await connection.OpenAsync();
                    Assert.True(connection.State == System.Data.ConnectionState.Open, "Database connection failed.");
                }
                catch (SqlException ex)
                {
                    Assert.Fail($"Database connection error: {ex.Message}");
                }
            }
        }
        [Fact]
        public async Task CanExecuteSimpleQuery()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT 1", connection))
                {
                    var result = await command.ExecuteScalarAsync();
                    Assert.NotNull(result);
                    Assert.Equal(1, (int)result);
                }
            }
        }
        [Fact]
        public async void LoginUser_ReturnJwtToken()
        {
            //Arrange
            var controller = new AuthController(authRepository);
            var testUser = A.Fake<UserView>();
            string token = "fake_jwt_token";

            //Act
            A.CallTo(() => authRepository.Login(testUser.Email, testUser.Password)).Returns(token);
            var result = await controller.Login(testUser);

            //Asset
            result.Should().BeOfType<OkObjectResult>();
        } 
    }
}
