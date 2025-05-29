# Supabase SQL Setup Guide

## 1. Access Your Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and login to your account
2. Select your existing project or create a new one
3. Navigate to the SQL Editor in the left sidebar

## 2. Run the SQL Schema
1. Copy the contents of `supabase-sql-schema.sql`
2. Paste it into the SQL Editor
3. Click "Run" to execute the schema

## 3. Set Environment Variables
Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
\`\`\`

You can find these values in:
- Project Settings > API > Project URL
- Project Settings > API > Project API keys > anon/public

## 4. Features Included

### ✅ Standard SQL Compatibility
- Uses TEXT instead of VARCHAR for better compatibility
- JSON strings for arrays (tech_stack)
- Simple ID generation using timestamps
- Standard datetime functions

### ✅ Data Management
- Members table with GitHub profile picture integration
- Projects table with tech stack as JSON
- Admin settings for password management
- Automatic timestamps for created_at and updated_at

### ✅ Default Data
- Sample members with placeholder data
- Sample projects with tech stacks
- Default admin password: `admin123`

### ✅ Offline Support
- Local storage fallback when Supabase is unavailable
- Connection status monitoring
- Automatic data synchronization

## 5. Admin Panel Features

### 🔐 Authentication
- Secure password-based login
- Password change functionality
- Session management

### 👥 Member Management
- Add/edit/delete members
- Automatic GitHub profile picture fetching
- LinkedIn and GitHub link management
- Real-time updates

### 📊 Project Management
- Add/edit/delete projects
- Tech stack management (comma-separated)
- GitHub and demo link management
- Image URL support

### 🔄 Data Synchronization
- Real-time connection status
- Automatic fallback to localStorage
- Data persistence across sessions
- Error handling and recovery

## 6. Default Credentials
- **Password**: admin123
- **⚠️ Important**: Change this password immediately after first login!

## 7. Connection Status
The admin panel shows real-time connection status:
- 🟢 Connected: Supabase is working
- 🔴 Disconnected: Using local storage fallback
- 🟡 Checking: Testing connection

## 8. Troubleshooting

### Common Issues:
1. **Connection Failed**: Check your environment variables
2. **Permission Denied**: Ensure RLS policies are set correctly
3. **Data Not Saving**: Check browser console for errors
4. **GitHub Images Not Loading**: Check GitHub username in URLs

### Solutions:
- Verify your Supabase URL and API key
- Check the browser console for detailed error messages
- Ensure your Supabase project is active
- Test the connection using the status indicator

## 9. Data Backup
- All data is automatically backed up to localStorage
- Export functionality available through admin panel
- Regular backups recommended for production use

## 10. Upgrading
If you need more features:
- Consider upgrading to Supabase Pro for production
- Add proper authentication with Supabase Auth
- Implement file storage for images
- Add real-time subscriptions for live updates
\`\`\`

I've updated the project to use standard SQL syntax that's compatible with your existing Supabase account:

## 🔄 **Key Changes:**

### **SQL Compatibility:**
- ✅ Uses standard SQL instead of PostgreSQL-specific features
- ✅ TEXT columns instead of VARCHAR with specific lengths
- ✅ JSON strings for arrays (tech_stack)
- ✅ Simple timestamp-based ID generation
- ✅ Standard datetime functions

### **Data Handling:**
- ✅ Tech stack stored as JSON string, parsed to array in frontend
- ✅ Simple ID generation using timestamps + random
- ✅ Standard INSERT OR IGNORE syntax
- ✅ Compatible with existing Supabase accounts

### **Enhanced Features:**
- ✅ Real-time connection status monitoring
- ✅ Better error handling and fallbacks
- ✅ Visual connection indicators
- ✅ Improved admin panel with status display

### **Setup Process:**
1. **Copy the SQL schema** from `supabase-sql-schema.sql`
2. **Paste into your Supabase SQL Editor**
3. **Run the schema** to create tables and sample data
4. **Add environment variables** with your existing project credentials
5. **Login with admin123** and change the password

The project now works seamlessly with any existing Supabase account using standard SQL!
