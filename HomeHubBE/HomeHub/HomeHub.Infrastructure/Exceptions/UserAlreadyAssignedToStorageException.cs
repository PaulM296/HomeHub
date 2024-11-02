namespace HomeHub.Infrastructure.Exceptions
{
    public class UserAlreadyAssignedToStorageException : Exception
    {
        private const string MessageTemplate = "This user is already assigned to this storage.";

        public UserAlreadyAssignedToStorageException()
            : base(string.Format(MessageTemplate)) { }

        public UserAlreadyAssignedToStorageException(Exception innerException)
            : base(string.Format(MessageTemplate), innerException) { }
    }
}
