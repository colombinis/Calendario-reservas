const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Initialize Supabase client
// TODO: Make sure to set SUPABASE_URL and SUPABASE_KEY environment variables.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_KEY environment variables are required.");
  // Optionally, exit or disable Supabase-dependent routes
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', function (req, res) {
  res.send('Hello World! Express server is running.');
});

// Endpoint to check Supabase client status
app.get('/supabase-status', async (req, res) => {
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Supabase URL or Key not configured in environment variables." });
  }
  try {
    // A simple test query: fetch all schemas. This usually requires admin privileges or specific grants.
    // A more robust check might be to query a specific, known public table if one exists,
    // or simply confirm the client object was created.
    // For now, let's try to query a non-existent table to see if client is alive, expecting an error related to table not found, not auth.
    // A less intrusive check:
    // const { data, error } = await supabase.from('non_existent_table_for_status_check').select('*').limit(1);
    // if (error && error.message.includes('relation "non_existent_table_for_status_check" does not exist')) {
    //   res.status(200).json({ status: 'Supabase client initialized and can connect, but test table does not exist (expected).', clientExists: !!supabase });
    // } else if (error) {
    //   throw error; // Re-throw other errors
    // } else {
    //   res.status(200).json({ status: 'Supabase client initialized and can connect.', clientExists: !!supabase, data });
    // }
    // Simpler check: just confirm the client object exists after initialization.
    if (supabase) {
      res.status(200).json({ status: 'Supabase client object created. Further operations will test connectivity.', clientConfigured: true });
    } else {
      // This case should ideally be caught by the initial check for supabaseUrl and supabaseKey
      res.status(500).json({ status: 'Supabase client object failed to create.', clientConfigured: false });
    }
  } catch (error) {
    console.error('Supabase status check error:', error);
    res.status(500).json({ status: 'Error connecting to Supabase or executing test query.', error: error.message, clientConfigured: !!supabase });
  }
});

// Endpoint to fetch data from Supabase
// IMPORTANT: Ensure you have a table named 'test_items' in your Supabase project.
// Example schema for 'test_items':
// id: uuid (primary key)
// name: text
// created_at: timestamp with time zone (default now())
// Also, ensure RLS policies allow select operations, or disable RLS for testing.
app.get('/fetch-items', async (req, res) => {
  if (!supabaseUrl || !supabaseKey || !supabase) {
    return res.status(500).json({ error: "Supabase client not initialized." });
  }

  try {
    const { data, error } = await supabase
      .from('test_items') // Make sure 'test_items' table exists
      .select('*');

    if (error) {
      console.error('Error fetching items:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Items fetched successfully', data });
  } catch (error) {
    console.error('Server error while fetching items:', error);
    res.status(500).json({ error: 'Internal server error while fetching items.' });
  }
});

// Endpoint to insert data into Supabase
// IMPORTANT: Ensure RLS policies allow insert operations for the 'test_items' table.
// Expects a JSON body with item data, e.g., { "name": "My New Item" }
app.post('/insert-item', async (req, res) => {
  if (!supabaseUrl || !supabaseKey || !supabase) {
    return res.status(500).json({ error: "Supabase client not initialized." });
  }

  const { name } = req.body; // Example: expecting an item with a 'name' property

  if (!name) {
    return res.status(400).json({ error: "Item 'name' is required in the request body." });
  }

  try {
    // Supabase insert returns an array of records.
    // By default, it doesn't return the inserted row. To get it back, you'd use .select()
    // e.g., .insert([{ name }]).select()
    const { data, error, status } = await supabase
      .from('test_items')
      .insert([{ name: name }]) // Assuming 'name' is a column in 'test_items'
      .select(); // Return the inserted record

    if (error) {
      console.error('Error inserting item:', error);
      return res.status(status || 400).json({ error: error.message });
    }

    // If using .select(), data will contain the inserted record(s)
    res.status(201).json({ message: 'Item inserted successfully', data: data ? data[0] : null });
  } catch (error) {
    console.error('Server error while inserting item:', error);
    res.status(500).json({ error: 'Internal server error while inserting item.' });
  }
});

// Endpoint to update data in Supabase
// IMPORTANT: Ensure RLS policies allow update operations for the 'test_items' table.
// Expects an item ID in the URL and a JSON body with data to update, e.g., { "name": "My Updated Item" }
app.put('/update-item/:id', async (req, res) => {
  if (!supabaseUrl || !supabaseKey || !supabase) {
    return res.status(500).json({ error: "Supabase client not initialized." });
  }

  const itemId = req.params.id;
  const { name } = req.body; // Example: expecting an item with a 'name' property to update

  if (!name) {
    return res.status(400).json({ error: "Item 'name' is required in the request body for update." });
  }

  if (!itemId) {
    return res.status(400).json({ error: "Item ID is required in the URL." });
  }

  try {
    const { data, error, status } = await supabase
      .from('test_items')
      .update({ name: name }) // Update the 'name' column
      .eq('id', itemId)       // Where 'id' matches itemId
      .select();              // Return the updated record

    if (error) {
      console.error('Error updating item:', error);
      return res.status(status || 400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Item not found or no changes made.' });
    }

    res.status(200).json({ message: 'Item updated successfully', data: data[0] });
  } catch (error) {
    console.error('Server error while updating item:', error);
    res.status(500).json({ error: 'Internal server error while updating item.' });
  }
});

// Endpoint to delete data from Supabase
// IMPORTANT: Ensure RLS policies allow delete operations for the 'test_items' table.
// Expects an item ID in the URL.
app.delete('/delete-item/:id', async (req, res) => {
  if (!supabaseUrl || !supabaseKey || !supabase) {
    return res.status(500).json({ error: "Supabase client not initialized." });
  }

  const itemId = req.params.id;

  if (!itemId) {
    return res.status(400).json({ error: "Item ID is required in the URL." });
  }

  try {
    // Using .select() here will return the deleted row(s).
    // If you don't need the deleted data back, you can omit .select().
    const { data, error, status } = await supabase
      .from('test_items')
      .delete()
      .eq('id', itemId)
      .select(); // Return the deleted record

    if (error) {
      console.error('Error deleting item:', error);
      return res.status(status || 400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    res.status(200).json({ message: 'Item deleted successfully', data: data[0] });
  } catch (error) {
    console.error('Server error while deleting item:', error);
    res.status(500).json({ error: 'Internal server error while deleting item.' });
  }
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001! Supabase integration is being set up.');
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Warning: SUPABASE_URL and SUPABASE_KEY are not set. Supabase features will not work.");
  } else {
    console.log("Supabase client initialized with provided URL.");
  }
});
