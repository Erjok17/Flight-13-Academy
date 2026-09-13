require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name: 'Test', email: 'test@test.com', subject: 'Test', message: 'Test message', status: 'unread' }])
    .select()
    .single();

  console.log('Data:', data);
  console.log('Error:', error);
}

test();