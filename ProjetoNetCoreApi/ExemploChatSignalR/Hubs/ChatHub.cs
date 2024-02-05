using Microsoft.AspNetCore.SignalR;

namespace ExemploChatSignalR.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly HashSet<string> ConnectedUsers = new HashSet<string>();

        public async Task SendMessage(string user, string message)
        {
            var connectionId = Context.ConnectionId;
            await Clients.All.SendAsync("ReceiveMessage", user, message, connectionId);
        }

        public override Task OnConnectedAsync()
        {
            ConnectedUsers.Add(Context.ConnectionId);
            Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            ConnectedUsers.Remove(Context.ConnectionId);
            Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

    }
}
