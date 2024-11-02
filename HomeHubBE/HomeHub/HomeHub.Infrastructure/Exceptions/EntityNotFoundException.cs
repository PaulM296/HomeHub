namespace HomeHub.Infrastructure.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        private const string MessageTemplate = "The {0} with id {1} was not found.";
        private const string MessageTemplate2 = "The {0} with name {1} was not found.";

        public EntityNotFoundException()
            : base() { }

        public EntityNotFoundException(string entityType, Guid entityId)
            : base(string.Format(MessageTemplate, entityType, entityId)) { }

        public EntityNotFoundException(string entityType, Guid entityId, Exception innerException)
            : base(string.Format(MessageTemplate, entityType, entityId), innerException) { }

        public EntityNotFoundException(string entityType, string entityName)
            : base(string.Format(MessageTemplate2, entityType, entityName)) { }

        public EntityNotFoundException(string entityType, string entityName, Exception innerException)
            : base(string.Format(MessageTemplate2, entityType, entityName), innerException) { }
    }
}
