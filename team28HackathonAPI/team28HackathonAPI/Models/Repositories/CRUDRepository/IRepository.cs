using System.Linq.Expressions;

namespace team28HackathonAPI.Models.Repositories.CRUDRepository
{
    public interface IRepository
    {
        IQueryable<T> GetAll<T>() where T : class;
        IQueryable<T> GetEntityByCondition<T>(Expression<Func<T, bool>> expression) where T : class;
        void Delete<T>(T Entity) where T : class;
        Task Add<T>(T Entity) where T : class;
        Task Update<T>(T Entity) where T : class;
        Task SaveChangesAsync();
    }
}
