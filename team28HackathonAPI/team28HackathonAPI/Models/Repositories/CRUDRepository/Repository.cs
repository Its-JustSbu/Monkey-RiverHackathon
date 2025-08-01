using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using team28HackathonAPI.DBContext;

namespace team28HackathonAPI.Models.Repositories.CRUDRepository
{
    public class Repository : IRepository
    {
        private readonly Team28DbContext team28DbContext;
        public Repository(Team28DbContext team28DbContext)
        {
            this.team28DbContext = team28DbContext;
        }
        public async Task Add<T>(T Entity) where T : class
        {
            await team28DbContext.Set<T>().AddAsync(Entity);
        }

        public void Delete<T>(T Entity) where T : class
        {
            throw new NotImplementedException();
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return team28DbContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> GetEntityByCondition<T>(Expression<Func<T, bool>> expression) where T : class
        {
            return team28DbContext.Set<T>().Where(expression).AsNoTracking();
        }

        public async Task SaveChangesAsync()
        {
            await team28DbContext.SaveChangesAsync();
        }

        public async Task Update<T>(T Entity) where T : class
        {
            team28DbContext.Set<T>().Update(Entity);
        }
    }
}
