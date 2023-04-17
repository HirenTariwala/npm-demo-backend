const createClient  = require('@supabase/supabase-js').createClient;

const supabaseUrl = 'https://xvofzpbfrybkacuzkfjn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2b2Z6cGJmcnlia2FjdXprZmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3MTgxMzcsImV4cCI6MTk5NzI5NDEzN30.Tln9HIwRNKISdER77Au5xzZD-FLzazGweeHBbzGVOLw'
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = {supabase};


