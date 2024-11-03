using AutoMapper;
using HomeHub.App.Dtos.StorageDtos;
using HomeHub.App.Dtos.UserDtos;
using HomeHub.Domain.Entities;

namespace HomeHub.App
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<User, UserResponseDto>();
            CreateMap<Storage, StorageResponseDto>();
        }
    }
}
