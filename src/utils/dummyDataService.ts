
import { supabase } from '@/integrations/supabase/client';

interface DummyDataResult {
  success: boolean;
  message?: string;
}

export async function populateDummyData(userId: string): Promise<DummyDataResult> {
  try {
    // Track progress for each data type
    const results = await Promise.all([
      populateTrackingData(userId),
      populateCommunityData(),
      populateResourcesData(),
      populateWellnessData(userId)
    ]);
    
    // Check if any operation failed
    const failedOperations = results.filter(r => !r.success);
    
    if (failedOperations.length > 0) {
      return {
        success: false,
        message: `Some data could not be populated: ${failedOperations.map(r => r.message).join(', ')}`
      };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error in populateDummyData:', error);
    return {
      success: false,
      message: error.message || 'Unknown error occurred'
    };
  }
}

async function populateTrackingData(userId: string): Promise<DummyDataResult> {
  try {
    // Create feeding data
    const feedingData = [
      {
        user_id: userId,
        type: 'Breastmilk',
        amount: '3 oz',
        duration: 15,
        time: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        notes: 'Left side feeding'
      },
      {
        user_id: userId,
        type: 'Formula',
        amount: '4 oz',
        time: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        notes: 'Took full bottle'
      }
    ];
    
    const { error: feedingError } = await supabase
      .from('feeding_tracking')
      .upsert(feedingData, { onConflict: 'user_id,time' });
      
    if (feedingError) throw new Error(`Feeding data error: ${feedingError.message}`);
    
    // Create diaper data
    const diaperData = [
      {
        user_id: userId,
        type: 'Wet',
        time: new Date(Date.now() - 2600000).toISOString(), // ~45 mins ago
        notes: 'Normal'
      },
      {
        user_id: userId,
        type: 'Dirty',
        time: new Date(Date.now() - 6000000).toISOString(), // ~1.6 hours ago
        notes: 'Yellow color'
      }
    ];
    
    const { error: diaperError } = await supabase
      .from('diaper_tracking')
      .upsert(diaperData, { onConflict: 'user_id,time' });
      
    if (diaperError) throw new Error(`Diaper data error: ${diaperError.message}`);
    
    // Create sleep data
    const sleepData = [
      {
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        hours: 6.5,
        quality: 'Good',
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
        hours: 5,
        quality: 'Fair',
      }
    ];
    
    const { error: sleepError } = await supabase
      .from('sleep_tracking')
      .upsert(sleepData, { onConflict: 'user_id,date' });
      
    if (sleepError) throw new Error(`Sleep data error: ${sleepError.message}`);
    
    // Create growth data
    const growthData = [
      {
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        weight: 8.2,
        height: 21.5,
        head_circumference: 14.5,
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 2592000000).toISOString().split('T')[0], // ~30 days ago
        weight: 7.8,
        height: 21,
        head_circumference: 14.2,
      }
    ];
    
    const { error: growthError } = await supabase
      .from('growth_tracking')
      .upsert(growthData, { onConflict: 'user_id,date' });
      
    if (growthError) throw new Error(`Growth data error: ${growthError.message}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Error in populateTrackingData:', error);
    return {
      success: false,
      message: `Tracking data: ${error.message}`
    };
  }
}

async function populateCommunityData(): Promise<DummyDataResult> {
  try {
    // Create community groups
    const groups = [
      {
        name: 'New Moms Support',
        description: 'A group for first-time mothers to share experiences and get support.',
        category: 'Support',
        member_count: 142,
        image_url: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?q=80&w=500&auto=format&fit=crop'
      },
      {
        name: 'Breastfeeding Tips',
        description: 'Share advice and resources for successful breastfeeding.',
        category: 'Advice',
        member_count: 89,
        image_url: 'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?q=80&w=500&auto=format&fit=crop'
      },
      {
        name: 'Working Mothers',
        description: 'Balancing career and motherhood - tips, stories, and support.',
        category: 'Work-Life',
        member_count: 213,
        image_url: 'https://images.unsplash.com/photo-1551892269-860b1e482f91?q=80&w=500&auto=format&fit=crop'
      }
    ];
    
    const { error: groupsError } = await supabase
      .from('community_groups')
      .upsert(groups, { onConflict: 'name' });
      
    if (groupsError) throw new Error(`Community groups error: ${groupsError.message}`);
    
    // Create community events
    const events = [
      {
        title: 'Virtual Baby Care Workshop',
        description: 'Learn the essentials of newborn care from pediatric nurses.',
        category: 'Workshop',
        event_date: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
        location: 'Zoom Meeting',
        image_url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=500&auto=format&fit=crop'
      },
      {
        title: 'Mom & Baby Yoga',
        description: 'A gentle yoga session for moms and their babies to bond and relax.',
        category: 'Wellness',
        event_date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
        location: 'Central Park, NY',
        image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop'
      }
    ];
    
    const { error: eventsError } = await supabase
      .from('events')
      .upsert(events, { onConflict: 'title,event_date' });
      
    if (eventsError) throw new Error(`Events error: ${eventsError.message}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Error in populateCommunityData:', error);
    return {
      success: false,
      message: `Community data: ${error.message}`
    };
  }
}

async function populateResourcesData(): Promise<DummyDataResult> {
  try {
    // Create guides
    const guides = [
      {
        title: 'Breastfeeding Basics',
        description: 'A comprehensive guide to get started with breastfeeding.',
        content: 'Breastfeeding is a natural process, but it can take time to learn. This guide covers proper latch techniques, feeding frequency, and common challenges new mothers face when breastfeeding.',
        category: 'Nutrition',
        author: 'Dr. Sarah Johnson',
        image_url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=500&auto=format&fit=crop'
      },
      {
        title: 'Sleep Training Methods',
        description: 'Different approaches to help your baby develop healthy sleep habits.',
        content: 'Sleep is crucial for both baby and parent well-being. This guide explores various sleep training methods including cry-it-out, no-tears, and chair methods, with pros and cons of each approach.',
        category: 'Sleep',
        author: 'Emma Williams, Sleep Consultant',
        image_url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=500&auto=format&fit=crop'
      },
      {
        title: 'Postpartum Recovery',
        description: 'What to expect and how to care for yourself after childbirth.',
        content: 'The postpartum period brings physical and emotional changes. This guide covers recovery from both vaginal births and C-sections, dealing with hormonal changes, and when to seek medical help.',
        category: 'Wellness',
        author: 'Dr. Lisa Martinez, OB/GYN',
        image_url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=500&auto=format&fit=crop'
      }
    ];
    
    const { error: guidesError } = await supabase
      .from('guides')
      .upsert(guides, { onConflict: 'title' });
      
    if (guidesError) throw new Error(`Guides error: ${guidesError.message}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Error in populateResourcesData:', error);
    return {
      success: false,
      message: `Resources data: ${error.message}`
    };
  }
}

async function populateWellnessData(userId: string): Promise<DummyDataResult> {
  try {
    // Create mood tracking data
    const moodData = [
      {
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        mood: 'Happy',
        notes: 'Feeling good today'
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
        mood: 'Tired',
        notes: 'Baby was up all night'
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
        mood: 'Stressed',
        notes: 'Busy day with appointments'
      }
    ];
    
    const { error: moodError } = await supabase
      .from('mood_tracking')
      .upsert(moodData, { onConflict: 'user_id,date' });
      
    if (moodError) throw new Error(`Mood data error: ${moodError.message}`);
    
    // Create hydration tracking data
    const hydrationData = [
      {
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        cups: 6
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
        cups: 4
      }
    ];
    
    const { error: hydrationError } = await supabase
      .from('hydration_tracking')
      .upsert(hydrationData, { onConflict: 'user_id,date' });
      
    if (hydrationError) throw new Error(`Hydration data error: ${hydrationError.message}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Error in populateWellnessData:', error);
    return {
      success: false,
      message: `Wellness data: ${error.message}`
    };
  }
}
