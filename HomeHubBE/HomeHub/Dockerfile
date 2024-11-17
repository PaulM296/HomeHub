FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-dev
WORKDIR /app

COPY . ./
RUN dotnet restore HomeHub.sln
RUN dotnet publish HomeHub.API/HomeHub.API.csproj -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-dev /app/out .

ENTRYPOINT ["dotnet", "HomeHub.API.dll", "--migrate"]
